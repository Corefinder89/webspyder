export const SIDEBAR_SELECT_FIELD = "SIDEBAR_SELECT_FIELD"


export const selectField = (fieldLabel) => {
    return async (dispatch) => {
        await dispatch({ type: SIDEBAR_SELECT_FIELD, fieldLabel })
    }
}


export default {
    SIDEBAR_SELECT_FIELD,

    selectField
}
