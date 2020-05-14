
import * as ActionTypes from './ActionTypes';

export const Comments = (state = {errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: action.payload};  //return the payload from ErrMess
            case ActionTypes.COMMENTS_FAILED:
                return {...state, errMess: action.payload};     
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            //comment.id = state.comments.length;// length of the coments array
          //  comment.date = new Date().toISOString();
            return {...state, comments: state.concat(comment)};// attach a obj to a new array w/o mutating the array. new cooment is added to end of array and returned
        default:
            return state;
      }
};
