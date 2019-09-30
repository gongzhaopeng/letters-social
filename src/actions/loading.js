import * as types from "../contstants/types";

export function loading() {
    return {
        type: types.app.LOADING
    };
}

export function loaded() {
    return {
        type: types.app.LOADED
    };
}
