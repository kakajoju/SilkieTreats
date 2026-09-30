import { k } from "./kaplayLoader.js";
import { loading } from "./scenes/loading.js";
import { intro } from "./scenes/intro.js";
import { shop } from "./scenes/shop.js";
import { kitchen } from "./scenes/kitchen.js";
import { endDay } from "./scenes/endDay.js";
import { endSequence } from "./scenes/endSequence.js";

async function main() {
    //TODO: load all the days and put them in a script array
    const dayOne = await (await fetch("../assets/script/test.json")).json();
    const script = [dayOne, dayOne, ];

    k.scene("shop", () => {
        shop(k, script);
    })

    k.scene("kitchen", () => {
        kitchen(k);
    })

    k.scene("endDay", () => {
        endDay(k, script);
    })

    k.scene("endSequence", () => {
        endSequence(k);
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