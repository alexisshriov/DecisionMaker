import { ADD_OPTION_SUCCESS, LOAD_LIST_SUCCESS, DELETE_OPTION_SUCCESS } from '../constants/actionTypes'

const optionsReducer = (state = [], action) => {
    debugger
    switch (action.type) {
        case ADD_OPTION_SUCCESS:
            return [...state, action.optionDesc]
        case DELETE_OPTION_SUCCESS:
            let newState = [...state]
            newState.splice(action.index, 1);
            return newState
        case LOAD_LIST_SUCCESS:
            return action.list
        default:
            return state;
    }
}

export default optionsReducer;