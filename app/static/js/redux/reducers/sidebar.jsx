import {
    SIDEBAR_SELECT_MODE,
} from '../actions/sidebar'

let defaultState = {
    selectedMode: null,
}

const sidebar = (state = defaultState, action) => {
    switch (action.type) {
        case SIDEBAR_SELECT_MODE:
            return Object.assign({}, state, {
                selectedMode: action.mode,
            })

        default:
            return state
    }
}

export default {
    sidebar,
}