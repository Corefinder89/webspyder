import {
    DataLayerApi
} from "../../services"

import {
    showSpinner,
    hideSpinner,
} from "./spinner"

export const DL_GET_DL = "DL_GET_DL"


export const getDL = (url) => {
    return async (dispatch) => {
        try {
            dispatch(showSpinner())

            let response = await DataLayerApi.getDL({
                params: {
                    url,
                },
            })

            dispatch({ type: DL_GET_DL, dl: response.data })

            dispatch(hideSpinner())
        } catch (e) {
            dispatch(hideSpinner())
        }
    }
}


export default {
    DL_GET_DL,

    getDL
}
