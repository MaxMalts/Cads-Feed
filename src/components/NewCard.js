import React, {useRef} from 'react';
import styles from './NewCard.module.scss';
import baseStyles from '../assets/styles/base.module.scss';

export default function NewCard({onCreated}) {
    const titleInput = useRef(null);
    const descriptionInput = useRef(null);

    const onSubmit = event => {
        event.preventDefault();
        onCreated(titleInput.current.value, descriptionInput.current.value);
    }

    return (
        <div className={styles.newCardContainer}>
            <h2 className={styles.heading}>Create new card</h2>

            <form className={styles.form} name='new-card' onSubmit={onSubmit}>
                <input
                    className={baseStyles.inputField + ' ' + styles.title} ref={titleInput} type='text'
                    name='card-title'
                    placeholder='Card title' maxLength='50' required
                />
                <textarea
                    className={baseStyles.inputField + ' ' + styles.description} ref={descriptionInput}
                    name='card-description'
                    placeholder='Card description' required
                />
                <button className={baseStyles.button + ' ' + styles.createBtn} type='submit'>Create</button>
            </form>
        </div>
    );
}