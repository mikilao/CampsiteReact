import {createStore, combineReducers} from "redux";
//import{Reducer, initialState} from "./reducer";
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
        })
 );// you no longer need the reducer.js
    return store;
};
