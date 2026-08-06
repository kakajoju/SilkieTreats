
export const statePropsEnum = {
    day: "day",
    line: "line",
    affectionCurare: "affectionCurare",
    affectionPolder: "affectionPolder",
    affectionLantern: "affectionLantern",
};

function initStateManager() {
    const state = {
        day: 1,
        line: 0,
        affectionCurare: 0,
        affectionPolder: 0,
        affectionLantern: 0,
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