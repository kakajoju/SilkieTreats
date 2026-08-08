export function makeBinButton(k) {
    return k.make([
        k.pos(800, 1200),
        k.rect(200, 50), 
        k.color(255, 255, 255),
        k.outline(2),
        k.area(),
        "bin",
        {
            //TODD animation
        }
    ])
}