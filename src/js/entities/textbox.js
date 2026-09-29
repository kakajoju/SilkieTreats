export function makeTextbox(k, character, text) {
    return k.make([
        k.pos(800, 1200),
        k.rect(1500, 440),
        k.color(255, 255, 255),
        k.outline(2),
        "textbox",
        {
            close() {
                k.destroy(this);
            },
            setupEverything() {
                const textComponent = this.add(makeTextboxText(k, text));
                this.add(makeNameTag(k, character));

                textComponent.setEvents();
            },
            changeText(newText, newCharacter) {
                const textComponent = k.get("textboxText", { recursive: true });
                const nametag = k.get("textboxNametag", { recursive: true });
                textComponent[0].setText(newText);
                nametag[0].setName(newCharacter);
            },
            isTextFinished() {
                const textComponent = k.get("textboxText", { recursive: true })[0];
                if (textComponent.text != textComponent.fullText) return false;
                return true;
            },
            finishText() {
                const textComponent = k.get("textboxText", { recursive: true })[0];
                textComponent.text = textComponent.fullText;
            }
        },
    ])
}

function makeTextboxText(k, text) {
    return k.make([
        k.text("", {
            size: 50,
            width: 1480,
        }),
        k.pos(20, 80),
        k.color(0, 0, 0),
        "textboxText",
        {
            fullText: text,
            typingSpeed: 4, //secs per char
            timer: 0,
            close() {
                k.destroy(this);
            },
            setText(newText) {
                this.text = "";
                this.fullText = newText;
            },
            setEvents() {
                k.onUpdate(() => {
                    if (this.timer < this.typingSpeed) {
                        this.timer++;
                        return;
                    }

                    if (this.text != this.fullText) {
                        const newLength = this.text.length + 1;
                        this.text = this.fullText.substring(0, newLength);
                        this.timer = 0;
                    }
                })
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
        k.pos(20, 20),
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