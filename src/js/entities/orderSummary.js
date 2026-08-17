export function makeOrderSummary(k) {
    return k.make([
        k.pos(0, 0),
        k.rect(600, 400),
        k.color(255, 255, 255),
        k.outline(2),
        "orderSummary",
        {
            initializeSummary(textArray) {
                const title = this.add(makeOrderText(k, textArray[0], 1, 0));
                this.add(makeOrderText(k, textArray[1], 0, 110));
                if (textArray.length > 2) {
                    this.add(makeOrderText(k, textArray[2], 0, 250));
                }
            }
        }
    ])
}

function makeOrderText(k, text, titlep, yShift) {
    return k.make([
        k.text(text, {
            size: titlep ? 80 : 50,
            width: 560,
        }),
        k.pos(20, 20 + yShift), // Padding from rectangle edge
        k.color(0, 0, 0),
        "orderSummaryText",
        {
            close() {
                k.destroy(this);
            },
        }
    ])
}