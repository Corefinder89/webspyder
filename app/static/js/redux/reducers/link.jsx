import {
    SELECT_CURRENT_LINK,
} from '../actions/link'

let defaultState = {
    currentLink: 'https://www.telstra.com.au/',
}

const link = (state = defaultState, action) => {
    switch (action.type) {
        case SELECT_CURRENT_LINK:
            return Object.assign({}, state, {
                currentLink: action.link,
            })

        default:
            return state
    }
}

export default {
    link,
}
