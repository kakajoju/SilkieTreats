export function makeTextbox(k, character, text) {
    return k.make([
        k.pos(800, 1200),
        k.rect(1500, 440), // Rectangle width: 200, height: 100
        k.color(255, 255, 255),
        k.outline(2),
        "textbox",
        {
            close() {
                k.destroy(this);
            },
            setupEverything() {
                this.add(makeTextboxText(k, text));
                this.add(makeNameTag(k, character));
            },
            changeText(newText, newCharacter) {
                const textComponent = k.get("textboxText", { recursive: true });
                const nametag = k.get("textboxNametag", { recursive: true });
                textComponent[0].setText(newText);
                nametag[0].setName(newCharacter);
            }
        },
    ])
}

function makeTextboxText(k, text) {
    return k.make([
        k.text(text, {
            size: 50,
            width: 1480, // Wrap text before hitting rect edge
        }),
        k.pos(20, 80), // Padding from rectangle edge
        k.color(0, 0, 0),
        "textboxText",
        {
            close() {
                k.destroy(this);
            },
            setText(newText) {
                this.text = newText;
            }
        }
    ])
}

function makeNameTag(k, character) {
    return k.make([
        k.text(character, {
            size: 60,
            width: 1460,
        }),
        k.pos(20, 20), // Padding from rectangle edge
        k.color(0, 0, 0),
        "textboxNametag",
        {
            close() {
                k.destroy(this);
            },
            setName(newText) {
                this.text = newText;
            }
        }
    ])
}