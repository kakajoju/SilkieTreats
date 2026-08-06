import { k } from "./kaplayLoader.js";
import { loading } from "./scenes/loading.js";
import { intro } from "./scenes/intro.js";
import { shop } from "./scenes/shop.js";
import { kitchen } from "./scenes/kitchen.js";
import { endDay } from "./scenes/endDay.js";

async function main() {
    //TODO: getting data from localStorage for load
    const script = await (await fetch("../assets/script/test.json")).json();

    k.scene("shop", () => {
        shop(k, script);
    })

    k.scene("kitchen", () => {
        kitchen(k);
    })

    //TODO will load a json for a new day, each day will be a separate json with line no as key
    k.scene("endDay", () => {
        endDay(k);
    })

    k.scene("intro", () => {
        intro(k);
    })

    k.go("intro");
}

main();

k.scene("loading", () => {
    loading(k);
});

k.go("loading");