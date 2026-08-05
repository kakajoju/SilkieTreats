import { setBackgroundColor } from "./utils.js";

export function loading(k) {
    setBackgroundColor(k, "#20214a");
    k.add([
        k.text("WIP"),
        k.pos(k.center()),
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
}