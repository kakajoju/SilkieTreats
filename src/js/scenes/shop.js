import { setBackgroundColor } from "./utils.js";
import { makeTextbox } from "../entities/textbox.js";
import { state, statePropsEnum } from "../state/globalStateManager.js";
import { makeCharacter } from "../entities/character.js";
import { makeFood } from "../entities/food.js";

export function shop(k, script) {
    setBackgroundColor(k, "#20214a");
    const shop = k.add([
        k.pos(0, 0),
        //k.sprite("shop"),
    ]);


    checkLine(k, script);
    let line = state.current().line;
    const kitchenReturn = state.current().isFoodGood >= 0 ? 1 : 0;
    let finFood = 0;

    const customer = shop.add(makeCharacter(k, kitchenReturn));
    customer.playAnimation(script[line].converstaion, script[line].sprite);

    if (kitchenReturn) {
        const finFlavours = state.current().finishedFlavour;
        const finRecipe = state.current().finishedRecipe;

        finFood = shop.add(makeFood(k, 1000, 1100));
        finFood.initializeFood(finRecipe, finFlavours);
    }

    const textbox = shop.add(makeTextbox(k, script[line].character, script[line].text));
    textbox.setupEverything();


    shop.onMousePress(() => {
        if (!textbox.isTextFinished()) {
            textbox.finishText();
            return;
        }

        line = line + 1;
        state.set(statePropsEnum.line, line);

        checkLine(k, script);
        line = state.current().line;

        if (line < script.length) {
            textbox.changeText(script[line].text, script[line].character);
            customer.playAnimation(script[line].converstaion, script[line].sprite);
            if (script[line].sprite == "leave" && finFood) { //I HOPE IT WORKS
                finFood.close();
            }
        }
    })
}

function checkLine(k, script) {
    let line = state.current().line;

    if (line >= script.length) {
        endDay(k);
        return;
    }

    state.set(statePropsEnum.conversation, script[line].conversation);
    let startConversation = state.current().conversation;

    if (script[line].character == "54") {
        kitchenGoTo(k, line, script);
        return;
    }

    while (!script[line].requirement.includes(state.current()[`affection${script[line].affectionGroup}`].toString()) || !script[line].meal.includes(state.current().isFoodGood.toString())) {
        line = line + 1;
        state.set(statePropsEnum.line, line);
        line = line = state.current().line;

        if (line >= script.length) {
            endDay(k);
            return;
        }

        if (script[line].character == "54") {
            kitchenGoTo(k, line, script);
            return;
        };

        if (startConversation != script[line].conversation) {
            changeConversation(finFood);
            state.set(statePropsEnum.conversation, script[line].conversation);
            let startConversation = state.current().conversation;
        }
    }
}

function endDay(k) {
    console.log("EOF");
    endConversation();
    //TODO switching to end of day
}

function kitchenGoTo(k, line, script) {
    const ingredientsArray = script[line].requirement.split("");
    const recipe = script[line].meal.split("");
    const affection = script[line].sprite.split("");
    const affectionRecipient = script[line].affectionGroup;
    const order = script[line].text.split("#");

    if (ingredientsArray.length > 5) {
        state.set(statePropsEnum.requiredFlavour, ingredientsArray.slice(0, 5));
        state.set(statePropsEnum.altFlavour, ingredientsArray.slice(5));

    } else {
        state.set(statePropsEnum.requiredFlavour, ingredientsArray);
    }
    state.set(statePropsEnum.requiredRecipe, recipe[0]);
    if (recipe.length > 1) {
        state.set(statePropsEnum.altRecipe, recipe[1]);
    }
    state.set(statePropsEnum.orderText, order);

    affection.unshift(affectionRecipient);
    state.set(statePropsEnum.kitchenAffectionInfo, affection);

    k.go("kitchen");
}

function changeConversation(food) {
    endConversation();
}

function endConversation() {
    state.set(statePropsEnum.conversation, "");
    state.set(statePropsEnum.requiredFlavour, []);
    state.set(statePropsEnum.requiredRecipe, -1);
    state.set(statePropsEnum.altRecipe, -1);
    state.set(statePropsEnum.altFlavour, []);
    state.set(statePropsEnum.orderText, []);
    state.set(statePropsEnum.finishedFlavour, []);
    state.set(statePropsEnum.finishedRecipe, -1);
    state.set(statePropsEnum.isFoodGood, -1);
    state.set(statePropsEnum.kitchenAffectionInfo, []);
}