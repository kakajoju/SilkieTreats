import { setBackgroundColor } from "./areaUtils.js";

export function intro(k) {
    setBackgroundColor(k, "#20214a");
    k.add([
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

    const startBtn = k.add([
        k.rect(200, 50),
        k.outline(5),
        k.color(190, 188, 194),
        k.pos(k.vec2(640, 520)),
        k.anchor("center"),
        k.area(),
        "start-button",
        {
            close() {
                k.destroy(this);
            }
        },
    ]);

    startBtn.add([
        k.text("START"),
        k.anchor("center"),
        k.color(0, 0, 0),
        {
            close() {
                k.destroy(this);
            },
        },
    ]);

    k.onClick("start-button", () => {
        k.go("shop");
    });
}