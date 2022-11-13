import * as actionTypes from '../actionTypes.js';

export const actionLoadCardComments = (articleId, comments) => ({
   type: actionTypes.loadCardComments,
   payload: {
       articleId,
       comments
   }
});

export const actionAddComment = (articleId, author, text) => ({
    type: actionTypes.addComment,
    payload: {
        articleId,
        author,
        text,
        date: new Date().toISOString().split('T')[0]
    }
});

export const actionDeleteComment = (articleId, id) => ({
    type: actionTypes.deleteComment,
    payload: {
        articleId,
        id
    }
});