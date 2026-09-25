import { state, statePropsEnum } from "../state/globalStateManager.js";
import { makeBtn } from "../entities/genericButton.js";
import { setBackgroundColor } from "./utils.js";

export function endDay(k, scripts) {
    const nextDay = state.current().day + 1;

    setBackgroundColor(k, "#20214a");
    const endDay = k.add([
        k.pos(0,0),
        //k.sprite("endDay-1"), CHANGE BASED ON DAY
    ]);

    const continueBtn = endDay.add(makeBtn(k, "continue", 500, 500));
    const saveBtn = endDay.add(makeBtn(k, "save", 600, 600));

    k.onClick("continue", (btn) => {
        state.set(statePropsEnum.day, nextDay);
        state.set(statePropsEnum.line, 0);
        k.go("shop");
    })

    k.onClick("save", (btn) => {
        const gameData = {
            "day": nextDay,
            "line": 0,
            "affectionCurare": state.current().affectionCurare,
            "affectionPolder": state.current().affectionPolder,
            "affectionSilkie": state.current().affectionSilkie,
        }
        localStorage.setItem("silkieTreatsSave", JSON.stringify(gameData));

        btn.switchSprite("saved");
    })

}