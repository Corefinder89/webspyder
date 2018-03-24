export const SIDEBAR_SELECT_MODE = "SIDEBAR_SELECT_MODE"


export const selectMode = (mode) => {
    return async (dispatch) => {
        await dispatch({ type: SIDEBAR_SELECT_MODE, mode })
    }
}


export default {
    SIDEBAR_SELECT_MODE,

    selectMode
}
