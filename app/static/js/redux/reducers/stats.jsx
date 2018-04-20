import {
    STATS_GET_STATS,
} from '../actions/stats'

let defaultState = {
    currentStats: null,
}

const stats = (state = defaultState, action) => {
    switch (action.type) {
        case STATS_GET_STATS:
            return Object.assign({}, state, {
                currentStats: action.stats,
            })

        default:
            return state
    }
}

export default {
    stats,
}
