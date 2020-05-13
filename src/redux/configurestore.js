import {createStore, combineReducers, applyMiddleware} from "redux";
//import{Reducer, initialState} from "./reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
import{Campsites} from './campsites';
import{Comments} from './comments';
import {Partners} from './partners';
import {Promotions} from './promotions';
import { InitialFeedback } from './form';
import {createForms}from 'react-redux-form';

//only takes 1 reducer and you can combine all reducer with a function combineReducers()
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions : Promotions,
            ...createForms({
                feedbackForm: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
 );// you no longer need the reducer.js
    return store;
};
