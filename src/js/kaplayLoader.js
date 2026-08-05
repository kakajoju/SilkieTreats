import kaplay from "../node_modules/kaplay/dist/kaplay.mjs";


export const scale = 2;
export const k = kaplay({
    width: 1600 * scale,
    height: 870 * scale,
    scale,
    letterbox: true,
    global: false,
    debug: true,
});

k.loadBean();