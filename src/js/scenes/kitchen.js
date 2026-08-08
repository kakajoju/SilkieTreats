import { setBackgroundColor } from "./utils.js";
import { state, statePropsEnum } from "../state/globalStateManager.js";
import { makeJar } from "../entities/jar.js";
import { makeRecipe } from "../entities/recipe.js";
import { makeMeter } from "../entities/meter.js";
import { makeBinButton } from "../entities/binButton.js";
import { makeMixButton } from "../entities/mixButton.js";
import { makeServeButton } from "../entities/serveButton.js";
import { makeFood } from "../entities/food.js";

export function kitchen(k) {
    const flavourList = ["Special", "Cute", "Elegant", "Intimidating", "Simple"];
    const recipeList = ["Chocolates", "Bonbons", "Rohlicky", "Lollies", "Cake"]; //TODO add Tiramisu + ??? for later routes
    let finishedFood = 0;

    const reqFlavours = state.current().requiredFlavour;
    const reqRecipe = state.current().requiredRecipe;
    const altRecipe = state.current().altRecipe;
    const altFlavours = state.current().altFlavour;
    const orderText = state.current().orderText;

    setBackgroundColor(k, "#da6ed1");
    const kitchen = k.add([
        k.pos(0, 0),
        //k.sprite("kitchen"),
    ]);

    flavourList.forEach((flavour, index) => {
        kitchen.add(makeJar(k, flavour, index, 500 * (index + 1), 200));
    })

    recipeList.forEach((flavour, index) => {
        kitchen.add(makeRecipe(k, flavour, index, 400 * (index + 1), 800));
    })

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
            finishedFood.clear();
            finishedFood = 0;
        }
        meter.clear();
        serveBtn.disableServeBtn();
        mixBtn.unmix();
    })

    k.onClick("mix", (btn) => {
        if (meter.isMixablep() && !mixBtn.isMixedp()) {
            //TODO create food from meter data
            //finishedFood = kitchen.add(makeFood())
            serveBtn.enableServeBtn();
            mixBtn.mix();
        }
    })

    k.onClick("serve", (btn) => {
        if (btn.isEnabledp()) {
            const finFlavours = meter.getFlavours();
            let reqCompleted = 1;
            let altFlag = 1;
            if (meter.getRecipe() == reqRecipe) {
                altFlag = 0;
                for (let i = 0; i < 5; i++) {
                    if (finFlavours < reqFlavours) {
                        reqCompleted = 0;
                        break;
                    }
                }
            }
            else if (meter.getRecipe() == altRecipe) {
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
                //TODO affection granted (2x)
            } else if (reqCompleted) {
                state.set(statePropsEnum.isFoodGood, 1);
                //TODO affection granted
            }
            console.log(altFlag);
            console.log(reqCompleted);
            console.log(state.current().isFoodGood);
            //TODO destroy food
            //TODO send to global variable food type
            const nextLine = state.current().line + 1;
            state.set(statePropsEnum.line, nextLine);
            k.go("shop");
        }
    })

    //TODO add two recipes if affection above x and day x
}