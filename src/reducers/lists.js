import { ADD_LIST_SUCCESS, LOAD_LISTS_SUCCESS, DELETE_LIST_SUCCESS } from '../constants/actionTypes'

const listsReducer = (state = [], action) => {

    switch (action.type) {
        case ADD_LIST_SUCCESS:
            return [...state, action.optionDesc]
        case DELETE_LIST_SUCCESS:
            let newState = [...state]
            newState.splice(action.index, 1);
            return newState
        case LOAD_LISTS_SUCCESS:
            return action.list
        default:
            return state;
    }
}

export default listsReducer;