import * as ActionTypes from './ActionTypes';
import {CAMPSITES} from '../shared/campsites';

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});
//how to add a 2 second delay to an action
export const fetchCampsites = () => dispatch =>{
    dispatch(campsitesLoading());
    setTimeout(() =>{
        dispatch(addCampsites(CAMPSITES));
            }, 2000)
}
// after the fetchcampsite run then this will 
export const campsitesLoading= () => () => ({
    type: ActionTypes.CAMPSITES_LOADING
})
 
export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});
