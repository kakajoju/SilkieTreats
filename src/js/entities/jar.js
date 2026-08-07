export function makeJar(k, type, number, x, y) {
    return k.make([
        k.sprite("bean"),
        k.pos(x, y),
        k.area(),
        k.scale(1),
        k.animate(),
        k.rotate(),
        `${type}jar`,
        "jar",
        {
            typeNumber: number,
            close() {
                k.destroy(this);
            },
            playHoverAnim() {
                //TODO change sprite
                this.unanimate("scale");
                this.unanimate("angle");
                this.animation.seek(0);
                this.animate("scale", [k.vec2(1, 1), k.vec2(1.2, 1.2)], { duration: 0.5, loops: 1 });
                this.animate("angle", [0, -5], { duration: 0.5, loops: 1 });
            },
            clearHoverAnim() {
                //TODO change sprite
                this.unanimate("scale");
                this.unanimate("angle");
                this.animation.seek(0);
                this.animate("scale", [k.vec2(1.2, 1.2), k.vec2(1, 1)], { duration: 0.5, loops: 1 });
                this.animate("angle", [-5, 0], { duration: 0.5, loops: 1 });
            }
        }
    ])
}