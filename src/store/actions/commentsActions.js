import * as actionTypes from '../actionTypes.js';

export const actionLoadCardComments = comments => ({
   type: actionTypes.loadCardComments,
   payload: {
       comments
   }
});

export const actionLikeComment = id => ({
    type: actionTypes.likeComment,
    payload: {
        id
    }
});

export const actionAddComment = (cardId, author, text) => ({
    type: actionTypes.addComment,
    payload: {
        cardId,
        author,
        text,
        date: new Date().toISOString().split('T')[0]
    }
});

export const actionDeleteComment = id => ({
    type: actionTypes.deleteComment,
    payload: {
        id
    }
});