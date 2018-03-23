export const SHOW_SPINNER = "SHOW_SPINNER"
export const HIDE_SPINNER = "HIDE_SPINNER"


export const showSpinner = () => {
    return async (dispatch) => {
        await dispatch({ type: SHOW_SPINNER })
    }
}

export const hideSpinner = () => {
    return async (dispatch) => {
        await dispatch({ type: HIDE_SPINNER })
    }
}


export default {
    SHOW_SPINNER,
    HIDE_SPINNER,

    showSpinner,
    hideSpinner,
}
