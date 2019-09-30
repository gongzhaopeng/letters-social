import * as types from "../contstants/types";

export function createError(error, info) {
    return {
        type: types.app.ERROR,
        error,
        info
    };
}
