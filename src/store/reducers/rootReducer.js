import cardsReducer from './cardsReducer';
import commentsReducer from './commentsReducer';

const rootReducer = (state, action) => {
    return commentsReducer(cardsReducer(state, action), action);
};

export default rootReducer;