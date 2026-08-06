export function setBackgroundColor(k, hexColorCode) {
    k.add([
        k.rect(k.width(), k.height()),
        k.color(k.Color.fromHex(hexColorCode)),
        k.fixed(),
        k.layer("background"),
    ]);
}
