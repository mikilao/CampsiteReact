import {createStore, combineReducers, applyMiddleware} from "redux";
//import{Reducer, initialState} from "./reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
import{Campsites} from './campsites';
import{Comments} from './comments';
import {Partners} from './partners';
import {Promotions} from './promotions';

//only takes 1 reducer and you can combine all reducer with a function
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions : Promotions
        }),
        applyMiddleware(thunk, logger)
 );// you no longer need the reducer.js
    return store;
};
