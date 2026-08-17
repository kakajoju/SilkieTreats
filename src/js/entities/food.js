export function makeFood(k, x, y) {
    return k.make([
        k.sprite("bean"), //TODO food sprite
        k.pos(x, y),
        k.anchor("botleft"),
        k.opacity(0),
        k.animate(),
        "food", 
        {
            close() {
                k.destroy(this);
            },
            determineFoodSprite(recipeNum, flavours) {
                const recipeList = ["Chocolates", "Bonbons", "Rohlicky", "Lollies", "Croissant", "Tiramisu", "BananaBread"];

                const recipe = recipeList[recipeNum];
                const flavour = getDominantFlavour(flavours);
                //this.sprite = `${recipe}-${flavour}`; UNCOMMENT ONCE SPRITE READY
            },
            spawn() {
                this.unanimate("opacity");
                this.animation.seek(0);
                this.animate("opacity", [0, 1], { duration: 0.5, loops: 1 });
            },
            initializeFood(recipe, flavours) {
                this.determineFoodSprite(recipe, flavours);
                this.spawn();
            }
        }
    ])
}

function getDominantFlavour(flavours) {
    let isTrash = 0;
    let dominantIndex = 0;

    for(let i = 1; i < 5; i++) {
        if (flavours[dominantIndex] < flavours[i]) {
            dominantIndex = i;
            isTrash = 0;
            continue;
        }

        if (flavours[dominantIndex] == flavours[i]) {
            isTrash = 1;
        }
    }

    if (isTrash) {
        return "trash";
    }

    switch (dominantIndex) {
        case 0:
            return "special";
        case 1:
            return "cute";
        case 2:
            return "elegant";
        case 3:
            return "intimidating";
        case 4:
            return "simple";
    }
}