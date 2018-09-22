import { ADD_OPTION, LOAD_LIST_SUCCESS } from '../constants/actionTypes'

const optionsReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_OPTION:
            return [...state, action.optionDesc]
        case LOAD_LIST_SUCCESS:
            return action.list
        default:
            return state;
    }
}

export default optionsReducer;