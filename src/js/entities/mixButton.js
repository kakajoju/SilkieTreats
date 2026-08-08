export function makeMixButton(k) {
    return k.make([
        k.pos(1750, 1210),
        k.rect(100, 100), 
        k.color(255, 255, 255),
        k.outline(2),
        k.area(),
        "mix",
        {
            isMixed: 0,
            isMixedp() {
                return this.isMixed;
            },
            mix() {
                this.isMixed = 1;
            }, 
            unmix() {
                this.isMixed = 0;
            }
            //TODD animation
        }
    ])
}