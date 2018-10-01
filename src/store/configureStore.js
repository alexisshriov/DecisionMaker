import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk';

const initialState = { options: [] }

function configureStore() {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

export default configureStore;
