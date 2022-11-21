import React, {useReducer} from 'react';
import baseStyles from '@assets/styles/base.module.scss';
import styles from './NewCard.module.scss';

const actionSetTitleField = 'SET_TITLE_FIELD';
const actionSetDescrField = 'SET_DESCRIPTION_FIELD';

function fieldsReducer(state, action) {
    switch(action.type) {
        case actionSetTitleField: {
            return {
                ...state,
                title: action.payload.title
            };
        }
        case actionSetDescrField: {
            return {
                ...state,
                description: action.payload.description
            };
        }
        default: {
            return state;
        }
    }
}

export default function NewCard({onCreated}) {
    const [fields, fieldsDispatch] = useReducer(
        fieldsReducer,
        {title: '', description: ''}
    );

    const onSubmit = event => {
        event.preventDefault();
        onCreated(fields.title, fields.description);
    }

    return (
        <div className={styles.newCardContainer}>
            <h2 className={styles.heading}>Create new card</h2>

            <form className={styles.form} name='new-card' onSubmit={onSubmit}>
                <input
                    className={baseStyles.inputField + ' ' + styles.title}
                    type='text'
                    name='card-title'
                    placeholder='Card title'
                    maxLength='50'
                    required
                    onChange={event => fieldsDispatch({
                        type: actionSetTitleField,
                        payload: {
                            title: event.target.value
                        }
                    })}
                />
                <textarea
                    className={baseStyles.inputField + ' ' + styles.description}
                    name='card-description'
                    placeholder='Card description'
                    required
                    onChange={event => fieldsDispatch({
                        type: actionSetDescrField,
                        payload: {
                            description: event.target.value
                        }
                    })}
                />
                <button className={baseStyles.button + ' ' + styles.createBtn} type='submit'>Create</button>
            </form>
        </div>
    );
}