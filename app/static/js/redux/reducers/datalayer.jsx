import {
    DL_GET_DL,
} from '../actions/datalayer'

let defaultState = {
    currentDL: {},
}

const dl = (state = defaultState, action) => {
    switch (action.type) {
        case DL_GET_DL:
            return Object.assign({}, state, {
                currentDL: action.dl,
            })

        default:
            return state
    }
}

export default {
    dl,
}
