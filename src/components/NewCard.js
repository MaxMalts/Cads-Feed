import React from 'react';
import styles from './NewCard.module.css';
import baseStyles from '../assets/styles/base.module.css';

export default class NewCard extends React.Component {
    constructor(props) {
        super(props);

        this.titleInput = React.createRef();
        this.descriptionInput = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onCreated(this.titleInput.current.value, this.descriptionInput.current.value);
    }

    render() {
        return (
            <div className={styles.newCardContainer}>
                <h2 className={styles.heading}>Create new card</h2>

                <form className={styles.form} name='new-card' onSubmit={this.onSubmit}>
                    <input
                        className={baseStyles.inputField + ' ' + styles.title} ref={this.titleInput} type='text'
                        name='card-title'
                        placeholder='Card title' maxLength='50' required
                    />
                    <textarea
                        className={baseStyles.inputField + ' ' + styles.description} ref={this.descriptionInput}
                        name='card-description'
                        placeholder='Card description' required
                    />
                    <button className={baseStyles.button + ' ' + styles.createBtn} type='submit'>Create</button>
                </form>
            </div>
        );
    }
}