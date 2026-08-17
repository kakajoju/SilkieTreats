export function makeCharacter(k, opacity) {
    return k.make([
        k.sprite("bean"),
        k.anchor("botleft"),
        k.pos(1000, 1000),
        k.opacity(opacity),
        k.animate(),
        "character",
        {
            currentChar: "bean",
            swapCharacter(character) {
                //this.sprite = character UNCOMMENT ONCE SPRITES IN
            },
            enter() {
                this.unanimate("opacity");
                this.animation.seek(0);
                this.animate("opacity", [0, 1], { duration: 0.5, loops: 1 });
            },
            leave() {
                this.unanimate("opacity");
                this.animation.seek(0);
                this.animate("opacity", [1, 0], { duration: 0.5, loops: 1 });
            },
            playAnimation(character, animation) {
                if (character != this.currentChat) {
                    this.swapCharacter(character);
                }
                
                switch(animation) {
                    case "null":
                        break;
                    case "enter":
                        this.enter();
                        break;
                    case "leave":
                        this.leave();
                        break;
                    default:
                        //this.play(animation); UNCOMMENT ONCE SPRITES IN
                        break;
                }
            }
        }
    ])
}