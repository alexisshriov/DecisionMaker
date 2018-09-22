import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk';

const initialState = { options: ["option 1", "option 2", "option 3", "option 4", "option 5"] }

function configureStore() {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

export default configureStore;
