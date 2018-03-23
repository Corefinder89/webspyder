import {
    SHOW_SPINNER,
    HIDE_SPINNER,
} from '../actions/spinner'

let defaultState = {
    showSpinner: false,
}

const spinner = (state = defaultState, action) => {
    switch (action.type) {
        case SHOW_SPINNER:
            return Object.assign({}, state, {
                showSpinner: true,
            })

        case HIDE_SPINNER:
            return Object.assign({}, state, {
                showSpinner: false,
            })

        default:
            return state
    }
}

export default {
    spinner,
}