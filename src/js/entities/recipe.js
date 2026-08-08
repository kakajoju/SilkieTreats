export function makeRecipe(k, type, number, x, y) {
    return k.make([
        k.sprite("bean"),
        k.pos(x, y),
        k.area(),
        k.scale(1),
        k.animate(),
        k.rotate(),
        `${type}Recipe`,
        `recipe-${number}`,
        "recipe",
        {
            typeNumber: number,
            selected: 0,
            close() {
                k.destroy(this);
            },
            playHoverAnim() {
                //TODO change sprite
                if (!this.selected) {
                    this.unanimate("scale");
                    this.unanimate("angle");
                    this.animation.seek(0);
                    this.animate("scale", [k.vec2(1, 1), k.vec2(1.2, 1.2)], { duration: 0.5, loops: 1 });
                    this.animate("angle", [0, -5], { duration: 0.5, loops: 1 });
                }
            },
            clearHoverAnim() {
                if (!this.selected) {
                    //TODO change sprite
                    this.unanimate("scale");
                    this.unanimate("angle");
                    this.animation.seek(0);
                    this.animate("scale", [k.vec2(1.2, 1.2), k.vec2(1, 1)], { duration: 0.5, loops: 1 });
                    this.animate("angle", [-5, 0], { duration: 0.5, loops: 1 });
                }
            },
            unselectRecipe() {
                if (this.selected) {
                    this.selected = 0;
                    this.clearHoverAnim();
                }
            },
            selectRecipe() {
                this.selected = 1;
            }
        }
    ])
}