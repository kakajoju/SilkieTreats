export function makeBtn(k, type, x, y) {
    return k.make([
        k.pos(x, y),
        k.sprite("bean"),
        k.outline(2),
        k.scale(2),
        k.area(),
        `${type}`,
        {
            setUpBtn() {
                this.switchSprite(type);
            },

            switchSprite(sprite) {
                switch (sprite) {
                    case "save":
                        this.use(k.sprite("saveBtn"));
                        break;
                    case "continue":
                        this.use(k.sprite("continueBtn"));
                        break;
                    case "saved":
                        this.use(k.sprite("savedBtn"));
                        break;
                    default:
                        break;
                }
            }
        }
    ])
}