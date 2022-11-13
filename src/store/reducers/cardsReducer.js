import initialState from '../initialState';
import * as actionTypes from '../actionTypes.js';

const cardsReducer = (state = initialState(), action) => {
    switch (action.type) {
        case actionTypes.loadCards: {
            return {
                ...state,
                cards: action.payload.cards
            };
        }
        case actionTypes.likeCard: {
            return {
                ...state,
                cards: state.cards.map(item => (
                    item.articleId === action.payload.id
                        ? {...item, currentLikes: item.currentLikes + 1}
                        : {...item}
                ))
            };
        }
        case actionTypes.addCard: {
            return {
                ...state,
                cards: state.cards.concat({
                    articleId: Math.max(0, ...state.cards.map(item => item.articleId)) + 1,
                    title: action.payload.title,
                    text: action.payload.description,
                    currentLikes: 0,
                    commentsCount: 0,
                    date: action.payload.date
                }),
            };
        }
        default: {
            return state;
        }
    }

};

export default cardsReducer;