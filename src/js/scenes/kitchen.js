import { setBackgroundColor } from "./utils.js";
import { state, statePropsEnum } from "../state/globalStateManager.js";
import { makeJar } from "../entities/jar.js";
import { makeRecipe } from "../entities/recipe.js";
import { makeMeter } from "../entities/meter.js";

export function kitchen(k) {
    const flavourList = ["Special", "Cute", "Elegant", "Intimidating", "Simple"];
    const recipeList = ["Chocolates", "Bonbons", "Rohlicky", "Lollies", "Cake"]; //TODO add Tiramisu + ??? for later routes

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

    const meter = kitchen.add(makeMeter(k));
    meter.setupEverything();

    //TODO on mouse click events for jars and recipes to send data to meter
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
        const recipes = k.get("recipe", { recursive: true });
        recipes.forEach((rec) => {
            rec.unselectRecipe();
        })
        recipe.selectRecipe();
        meter.pickRecipe(recipe.typeNumber);
    })

    //TODO add two recipes if affection above x and day x
}