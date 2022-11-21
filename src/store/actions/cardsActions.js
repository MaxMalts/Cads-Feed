import * as actionTypes from '@store/actionTypes.js';
import getCurDate from '@assets/helpers/getCurDate.js';

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
        date: getCurDate()
    }
});