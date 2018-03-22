import {
    SIDEBAR_SELECT_FIELD,
} from '../actions/sidebar'

let defaultState = {
    selectedField: null,
}

const sidebar = (state = defaultState, action) => {
    switch (action.type) {
        case SIDEBAR_SELECT_FIELD:
            return Object.assign({}, state, {
                selectedField: action.fieldLabel,
            })

        default:
            return state
    }
}

export default {
    sidebar,
}