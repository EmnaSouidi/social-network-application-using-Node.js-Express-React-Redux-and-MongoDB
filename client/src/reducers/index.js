import { combineReducers } from "redux";
import authReducer  from './authReducer';


export default combineReducers({
    auth: authReducer // Add your other reducers here. This is just an example.
});