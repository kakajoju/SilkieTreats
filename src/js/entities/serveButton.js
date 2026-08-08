export function makeServeButton(k) {
    return k.make([
        k.pos(600, 1800),
        k.rect(200, 50),
        k.color(255, 255, 255),
        k.outline(2),
        k.area(),
        k.animate(),
        "serve",
        {
            disabled: 1,
            enableServeBtn() {
                this.disabled = 0;
                //TODO slide in animation
                this.unanimate("pos");
                this.animation.seek(0);
                this.animate("pos", [k.vec2(600, 1800), k.vec2(800, 1290)], { duration: 1, loops: 1 });
            },
            disableServeBtn() {
                if (!this.disabled) {
                    this.disabled = 1;
                    //TODO slide out animation
                    this.unanimate("pos");
                    this.animation.seek(0);
                    this.animate("pos", [k.vec2(800, 1290), k.vec2(600, 1800)], { duration: 1, loops: 1 });
                }
            },
            isEnabledp() {
                return !this.disabled;
            }
        }
    ])
}