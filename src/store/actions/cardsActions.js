import * as actionTypes from '../actionTypes.js';

export const actionLoadCards = cards => ({
    type: actionTypes.loadCards,
    payload: {
        cards
    }
});

export const actionAddCard = (title, description) => ({
    type: actionTypes.addCard,
    payload: {
        title,
        description,
        date: new Date().toISOString().split('T')[0]
    }
});