import {applyMiddleware} from'redux';
import { legacy_createStore as createStore, compose } from 'redux'; //beacause  "redux": "^5.0.1"
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';




const initialState = {};

const middleware = [thunk];



const store= createStore(
    rootReducer,
    initialState,
    compose (
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    );

export default store;


