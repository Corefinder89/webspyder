import {
    StatsApi
} from "../../services"

import {
    showSpinner,
    hideSpinner,
} from "./spinner"

export const STATS_GET_STATS = "STATS_GET_STATS"


export const getStats = (url, mode) => {
    return async (dispatch) => {
        try {
            dispatch(showSpinner())

            let response = await StatsApi.getStats({
                params: {
                    url,
                    mode,
                },
            })

            dispatch({ type: STATS_GET_STATS, stats: response.data })

            dispatch(hideSpinner())
        } catch (e) {
            dispatch(hideSpinner())
        }
    }
}


export default {
    STATS_GET_STATS,

    getStats
}
