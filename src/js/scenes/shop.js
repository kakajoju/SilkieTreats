import { setBackgroundColor } from "./utils.js";
import { makeTextbox } from "../entities/textbox.js";
import { state, statePropsEnum } from "../state/globalStateManager.js";

export function shop(k, script) {
    //TODO array w keys to get y positions of all character sprites
    //TODO maybe the same for food???
    setBackgroundColor(k, "#20214a");
    const shop = k.add([
        k.pos(0, 0),
        //k.sprite("shop"),
    ]);

    //TODO spawn character

    checkLine(k, script);
    let line = state.current().line;
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

    while (!script[line].requirement.includes(state.current()[`affection${script[line].conversation}`]) || script[line].meal != state.current().isFoodGood) {
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
            changeConversation();
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

    k.go("kitchen");
}

function changeConversation() {
    endConversation();

    //TODO character spawning
}

function endConversation() {
    //TODO character leaving animation
    //TODO food disappearing

    state.set(statePropsEnum.conversation, "");
    state.set(statePropsEnum.requiredFlavour, []);
    state.set(statePropsEnum.requiredRecipe, -1);
    state.set(statePropsEnum.altRecipe, -1);
    state.set(statePropsEnum.altFlavour, []);
    state.set(statePropsEnum.orderText, []);
    state.set(statePropsEnum.finishedFlavour, []);
    state.set(statePropsEnum.finishedRecipe, -1);
    state.set(statePropsEnum.isFoodGood, 0);
}