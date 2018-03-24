export const SELECT_CURRENT_LINK = "SELECT_CURRENT_LINK"


export const selectLink = (link) => {
    return async (dispatch) => {
        await dispatch({ type: SELECT_CURRENT_LINK, link })
    }
}


export default {
    SELECT_CURRENT_LINK,

    selectLink
}
