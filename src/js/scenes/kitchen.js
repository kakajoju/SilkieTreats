import { setBackgroundColor } from "./utils.js";
import { state, statePropsEnum } from "../state/globalStateManager.js";
import { makeJar } from "../entities/jar.js";
import { makeRecipe } from "../entities/recipe.js";
import { makeMeter } from "../entities/meter.js";
import { makeBinButton } from "../entities/binButton.js";
import { makeMixButton } from "../entities/mixButton.js";
import { makeServeButton } from "../entities/serveButton.js";
import { makeFood } from "../entities/food.js";
import { makeOrderSummary } from "../entities/orderSummary.js";

export function kitchen(k) {
    //TODO add two recipes if affection above x and day x
    const flavourList = ["Special", "Cute", "Elegant", "Intimidating", "Simple"];
    const recipeList = ["Chocolates", "Bonbons", "Rohlicky", "Lollies", "Croissant"]; //TODO add Tiramisu + banana bread for later routes
    let finishedFood = 0;

    const reqFlavours = state.current().requiredFlavour;
    const reqRecipe = state.current().requiredRecipe;
    const altRecipe = state.current().altRecipe;
    const altFlavours = state.current().altFlavour;
    const orderText = state.current().orderText;
    const affectionInfo = state.current().kitchenAffectionInfo;

    setBackgroundColor(k, "#da6ed1");
    const kitchen = k.add([
        k.pos(0, 0),
        //k.sprite("kitchen"),
    ]);

    flavourList.forEach((flavour, index) => {
        kitchen.add(makeJar(k, flavour, index, 800 + (index * 300), 200));
    })

    recipeList.forEach((flavour, index) => {
        kitchen.add(makeRecipe(k, flavour, index, 400 + (index * 300), 800));
    })

    const orderSummaryComp = kitchen.add(makeOrderSummary(k));
    orderSummaryComp.initializeSummary(orderText);

    kitchen.add(makeBinButton(k));
    const mixBtn = kitchen.add(makeMixButton(k));
    const serveBtn = kitchen.add(makeServeButton(k));

    const meter = kitchen.add(makeMeter(k));
    meter.setupEverything();

    k.onHover("jar", (jar) => {
        jar.playHoverAnim();
    })

    k.onHoverEnd("jar", (jar) => {
        jar.clearHoverAnim();
    })

    k.onClick("jar", (jar) => {
        meter.addFlavour(jar.typeNumber);
    })

    k.onHover("recipe", (recipe) => {
        recipe.playHoverAnim();
    })

    k.onHoverEnd("recipe", (recipe) => {
        recipe.clearHoverAnim();
    })

    k.onClick("recipe", (recipe) => {
        if (!recipe.selected) {
            const recipes = k.get("recipe", { recursive: true });
            recipes.forEach((rec) => {
                rec.unselectRecipe();
            })
            recipe.selectRecipe();
            meter.pickRecipe(recipe.typeNumber);
        }
    })

    k.onClick("bin", (btn) => {
        if (finishedFood) {
            finishedFood.close();
            finishedFood = 0;
        }
        meter.clear();
        serveBtn.disableServeBtn();
        mixBtn.unmix();
    })

    k.onClick("mix", (btn) => {
        if (meter.isMixablep() && !mixBtn.isMixedp()) {
            finishedFood = kitchen.add(makeFood(k, 600, 600));
            finishedFood.initializeFood(meter.getRecipe(), meter.getFlavours());

            serveBtn.enableServeBtn();
            mixBtn.mix();
        }
    })

    k.onClick("serve", (btn) => {
        if (btn.isEnabledp()) {
            const finFlavours = meter.getFlavours();
            const finRecipe = meter.getRecipe();
            let reqCompleted = 1;
            let altFlag = 1;
            if (finRecipe == reqRecipe) {
                altFlag = 0;
                for (let i = 0; i < 5; i++) {
                    if (finFlavours < reqFlavours) {
                        reqCompleted = 0;
                        break;
                    }
                }
            }
            else if (finRecipe == altRecipe) {
                for (let i = 0; i < 5; i++) {
                    if (finFlavours < altFlavours) {
                        reqCompleted = 0;
                        break;
                    }
                }
            }
            else {
                altFlag = 0;
                reqCompleted = 0;
            }

            if (reqCompleted && altFlag) {
                state.set(statePropsEnum.isFoodGood, 2);

                const newAffection = state.current()[`affection${affectionInfo[0]}`] + parseInt(affectionInfo[2]);
                state.set(statePropsEnum[`affection${affectionInfo[0]}`], newAffection);
            } else if (reqCompleted) {
                state.set(statePropsEnum.isFoodGood, 1);

                const newAffection = state.current()[`affection${affectionInfo[0]}`] + parseInt(affectionInfo[1]);
                state.set(statePropsEnum[`affection${affectionInfo[0]}`], newAffection);
            } else {
                state.set(statePropsEnum.isFoodGood, 0);
            }
            console.log(altFlag);
            console.log(reqCompleted);
            console.log(state.current().isFoodGood);
            //TODO destroy food??
            const nextLine = state.current().line + 1;

            state.set(statePropsEnum.line, nextLine);
            state.set(statePropsEnum.finishedRecipe, finRecipe);
            state.set(statePropsEnum.finishedFlavour, finFlavours);

            k.go("shop");
        }
    })
}