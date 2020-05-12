import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;// length of the coments array
            comment.date = new Date().toISOString();
            return state.concat(comment);// attach a obj to a new array w/o mutating the array. new cooment is added to end of array and returned
        default:
            return state;
      }
};
