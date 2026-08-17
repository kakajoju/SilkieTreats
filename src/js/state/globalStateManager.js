
export const statePropsEnum = {
    day: "day",
    line: "line",
    conversation: "conversation",
    affectionCurare: "affectionCurare",
    affectionPolder: "affectionPolder",
    affectionLantern: "affectionLantern",
    requiredFlavour: "requiredFlavour",
    requiredRecipe: "requiredRecipe",
    orderText: "orderText",
    altRecipe: "altRecipe",
    altFlavour: "altFlavour",
    finishedFlavour: "finishedFlavour",
    finishedRecipe: "finishedRecipe",
    isFoodGood: "isFoodGood",
    kitchenAffectionInfo: "kitchenAffectionInfo",
};

function initStateManager() {
    const state = {
        day: 1,
        line: 0,
        conversation: "",
        affectionCurare: 0,
        affectionPolder: 0,
        affectionLantern: 0,
        kitchenAffectionInfo: [],
        requiredFlavour: [],
        requiredRecipe: -1,
        orderText: [],
        altRecipe: -1,
        altFlavour: [],
        finishedFlavour:  [],
        finishedRecipe: -1,
        isFoodGood: -1,
    };

    return {
        current() {
            return { ...state }
        },
        set(property, value) {
            state[property] = value;
        }
    };
}

export const state = initStateManager();