import {useReducer, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import signIn from '@assets/helpers/signIn.js';
import styles from './LoginPage.module.scss';
import baseStyles from '@assets/styles/base.module.scss';

const actionSetUsernameField = 'SET_USERNAME_FIELD';
const actionSetPasswordField = 'SET_PASSWORD_FIELD';

function fieldsReducer(state, action) {
    switch(action.type) {
        case actionSetUsernameField: {
            return {
                ...state,
                username: action.payload.username
            };
        }
        case actionSetPasswordField: {
            return {
                ...state,
                password: action.payload.password
            };
        }
        default: {
            return state;
        }
    }
}

export default function LoginPage() {
    const [fields, fieldsDispatch] = useReducer(
        fieldsReducer,
        {username: '', password: ''}
    );

    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const onSubmit = event => {
        event.preventDefault();
        signIn(fields.username, fields.password)
            ? navigate('/articles')
            : setError('wrong username or password');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Sign in</h2>

            <div className={styles.error}>
                {error}
            </div>

            <form className={styles.form} name='sign-in' onSubmit={onSubmit}>
                <input
                    className={baseStyles.inputField + ' ' + styles.input}
                    type='text'
                    name='username'
                    placeholder='Username'
                    required
                    onChange={event => (setError(null), fieldsDispatch({
                        type: actionSetUsernameField,
                        payload: {
                            username: event.target.value
                        }
                    }))}
                />
                <input
                    className={baseStyles.inputField + ' ' + styles.input}
                    type='password'
                    name='password'
                    placeholder='Password'
                    required
                    onChange={event => (setError(null), fieldsDispatch({
                        type: actionSetPasswordField,
                        payload: {
                            password: event.target.value
                        }
                    }))}
                />
                <button className={baseStyles.button + ' ' + styles.signInBtn} type='submit'>Sign in</button>
            </form>
        </div>
    )
}