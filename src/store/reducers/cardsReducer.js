import initialState from '../initialState.js';
import * as actionTypes from '../actionTypes.js';
import getNewId from '../../assets/helpers/getNewId';

const cardsReducer = (state = initialState(), action) => {
    switch (action.type) {
        case actionTypes.loadCards: {
            return {
                ...state,
                cards: action.payload.cards.map(item => (
                    item.comments === undefined
                        ? {...item, comments: []}
                        : item
                ))
            };
        }
        case actionTypes.addCard: {
            return {
                ...state,
                cards: state.cards.concat({
                    articleId: getNewId(state.cards, item => item.articleId),
                    title: action.payload.title,
                    text: action.payload.description,
                    currentLikes: 0,
                    commentsCount: 0,
                    date: action.payload.date,
                    comments: []
                }),
            };
        }
        default: {
            return state;
        }
    }

};

export default cardsReducer;