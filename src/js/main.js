import { k } from "./kaplayLoader.js";
import { loading } from "./scenes/loading.js";
import { intro } from "./scenes/intro.js";

k.scene("intro", () => {
    intro(k);
})

k.scene("loading", () => {
    loading(k);
});

k.go("loading");