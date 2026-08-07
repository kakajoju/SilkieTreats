export function makeMeter(k) {
    return k.make([
        k.rect(500, 140),
        k.pos(800, 1200),
        k.color(255, 255, 255),
        k.outline(6),
        "meter",
        {
            count: 0,
            composition: [0, 0, 0, 0, 0],
            recipe: 0,
            close() {
                k.destroy(this);
            },
            setupEverything() {
                for (let i = 0; i < 5; i++) {
                    this.add(makeLight(k, i));
                }
            },
            clear() {
                this.count = 0;
                this.composition = [0, 0, 0, 0, 0];
                this.recipe = 0;
                const lights = k.get("light", { recursive: true });
                lights.forEach((light) => {
                    light.clearColor();
                })
            },
            addFlavour(num) {
                if (this.count >= 5) {
                    return;
                }

                this.composition[this.count] = num;
                const light = k.get(`light-${this.count}`, { recursive: true })[0];
                light.changeColor(num);
                this.count++;
            },
            pickRecipe(num) {
                this.recipe = num;
                //TODO change text of recipe picked
            },

        }
    ])
}

function makeLight(k, index) {
    const colors = ["#57008E", "#D6006B", "#F2EEDD", "#D6060A", "#50A8FA"]
    return k.make([
        k.rect(50, 100),
        k.pos(20 + (index) * 100, 20),
        k.color(255, 255, 255),
        `light-${index}`,
        "light",
        {
            changeColor(num) {
                this.color = k.Color.fromHex(colors[num]);
            },
            clearColor() {
                this.color = k.Color.fromHex("#FFF");
            }
        }
    ])
}