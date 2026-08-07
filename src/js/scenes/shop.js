import { setBackgroundColor } from "./utils.js";
import { makeTextbox} from "../entities/textbox.js";
import { state, statePropsEnum } from "../state/globalStateManager.js";

export function shop(k, script) {
    let line = state.current().line;
    setBackgroundColor(k, "#20214a");
    const shop = k.add([
        k.pos(0, 0),
        //k.sprite("shop"),
    ]);

    const textbox = shop.add(makeTextbox(k, script[line].character, script[line].text));
    textbox.setupEverything();

    shop.onMousePress(() => {
        if (!textbox.isTextFinished()) {
            textbox.finishText();
            return;
        }

        line = line + 1;
        state.set(statePropsEnum.line, line);
        line = line = state.current().line;

        if (line >= script.length) {
            console.log("EOF");
            return;
            //TODO switching to end of day
        }

        if (script[line].character == "54") {
            k.go("kitchen");
            return;
        }

        textbox.changeText(script[line].text, script[line].character);
    })
}