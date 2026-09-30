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

k.loadSprite("shop", "./assets/background/shopBackground2.png");
k.loadSprite("shopForeground", "./assets/background/shopBackgroundProps.png");
k.loadSprite("endDay", "./assets/background/endDayBackground.png");

k.loadSprite("continueBtn", "./assets/ui/continueBtn.png");
k.loadSprite("saveBtn", "./assets/ui/saveBtn.png");
k.loadSprite("savedBtn", "./assets/ui/savedBtn.png");
k.loadSprite("textbox", "./assets/ui/textbox.png");