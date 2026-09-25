import { state, statePropsEnum } from "../state/globalStateManager.js";
import { makeBtn } from "../entities/genericButton.js";
import { setBackgroundColor } from "./utils.js";

export function intro(k) {
    setBackgroundColor(k, "#20214a");
    const intro = k.add([
        k.text("Silkie's Treats"),
        k.pos(k.vec2(640, 260)),
        k.anchor("center"),
        k.fixed(),
        k.color(255, 255, 255),
        {
            close() {
                k.destroy(this);
            },
        },
    ]
    );

    const startBtn = intro.add(makeBtn(k, "newGame", 640, 520));
    const loadBtn = intro.add(makeBtn(k, "continue", 800, 800));

    k.onClick("newGame", () => {
        k.go("shop");
    });

    k.onClick("continue", () => {
        const gameData = JSON.parse(localStorage.getItem("silkieTreatsSave"));
        if (gameData === null) {
            k.go("shop");
        }

        state.set(statePropsEnum.day, gameData.day);
        state.set(statePropsEnum.line, gameData.line);
        state.set(statePropsEnum.affectionCurare, gameData.affectionCurare);
        state.set(statePropsEnum.affectionPolder, gameData.affectionPolder);
        state.set(statePropsEnum.affectionSilkie, gameData.affectionSilkie);

        k.go("shop");
    })
}