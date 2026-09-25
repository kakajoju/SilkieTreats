export function makeBtn(k, type, x, y) {
    return k.make([
        k.pos(x, y),
        k.rect(200, 50), //TODO ADD SPRITES
        k.color(255, 255, 255),
        k.outline(2),
        k.area(),
        `${type}`,
        {
            switchSprite(sprite) {
                //TODO sprite switch
            }
        }
    ])
}