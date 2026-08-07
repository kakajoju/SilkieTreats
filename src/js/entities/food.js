export function makeFood(k, name, type, x, y) {
    return k.make([
        k.sprite("bean"), //TODO food sprite
        k.pos(x, y),
    ])
}