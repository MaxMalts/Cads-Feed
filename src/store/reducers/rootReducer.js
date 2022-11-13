import {combineReducers} from 'redux';
import cardsReducer from './cardsReducer';
import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
    cardsReducer,
    commentsReducer
});

export default rootReducer;