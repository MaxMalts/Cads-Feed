import * as actionTypes from '@store/actionTypes.js';
import getCurDate from '@assets/helpers/getCurDate.js';

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
        date: getCurDate()
    }
});

export const actionDeleteComment = (articleId, id) => ({
    type: actionTypes.deleteComment,
    payload: {
        articleId,
        id
    }
});