import initialState from '../initialState.js';
import * as actionTypes from '../actionTypes.js';
import getNewId from '../../assets/helpers/getNewId';

const commentsReducer = (state = initialState(), action) => {
    switch (action.type) {
        case actionTypes.loadCardComments: {
            return {
                ...state,
                cards: state.cards.map(item => (
                    item.articleId === action.payload.articleId
                        ? {...item, comments: action.payload.comments}
                        : item
                ))
            }
        }

        case actionTypes.addComment: {
            const curComments = state.cards.find(item => item.articleId === action.payload.articleId).comments;
            const newComments = [
                ...curComments,
                {
                    id: getNewId(curComments, item => item.id),
                    author: action.payload.author,
                    articleId: action.payload.articleId,
                    text: action.payload.text,
                    currentLikes: 0,
                    date: action.payload.date
                }];

            return {
                ...state,
                cards: state.cards.map(item => (
                    item.articleId === action.payload.articleId
                        ? {...item, commentsCount: item.commentsCount + 1, comments: newComments}
                        : item
                )),
            };
        }

        case actionTypes.deleteComment: {
            return {
                ...state,
                cards: state.cards.map(card => (
                    card.articleId === action.payload.articleId
                        ? {
                            ...card,
                            commentsCount: card.commentsCount - 1,
                            comments: card.comments.filter(item => item.id !== action.payload.id)
                        }
                        : card
                ))
            }
        }

        default: {
            return state
        }
    }
};

export default commentsReducer;