import { ADD_OPTION, LOAD_OPTIONS_SUCCESS, DELETE_OPTION } from '../constants/actionTypes'

const optionsReducer = (state = [], action) => {

    switch (action.type) {
        case ADD_OPTION:
            return [...state, action.optionDesc]
        case DELETE_OPTION:
            let newState = [...state]
            newState.splice(action.index, 1);
            return newState
        case LOAD_OPTIONS_SUCCESS:
            return action.list
        default:
            return state;
    }
}

export default optionsReducer;