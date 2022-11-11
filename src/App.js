import React from 'react';
import {getArticles} from './assets/helpers/get-articles';
import Card from './components/Card.js';
import NewCard from './components/NewCard.js';
import Popup from './components/Popup';
import baseStyles from './assets/styles/base.module.css';
import styles from './App.module.css';


export class App extends React.Component {
    state = {
        loading: true,
        cards: [],
        creatingCard: false
    }

    constructor(props) {
        super(props);

        this.onCreateCardClick = this.onCreateCardClick.bind(this);
        this.onCardCreation = this.onCardCreation.bind(this);
    }

    componentDidMount() {
        getArticles().then(cards => {
            this.setState({
                loading: false,
                cards: cards
            });
        })
    }

    onCreateCardClick() {
        this.setState({
            ...this.state,
            creatingCard: true
        });
    }

    onCardCreation(title, description) {
        this.setState({
            ...this.state,
            cards: this.state.cards.concat({
                articleId: Math.max(0, ...this.state.cards.map(item => item.articleId)) + 1,
                title: title,
                text: description,
                currentLikes: 0,
                commentsCount: 0
            }),
            creatingCard: false
        });
    }

    render() {
        return (
            <div className={styles.app}>
                <main className={styles.pageContainer}>
                    {this.state.loading
                        ? 'Loading...'
                        : this.state.cards.map(item => (
                            <div key={item.articleId} className={styles.card}>
                                <Card
                                    title={item.title}
                                    text={item.text}
                                    currentLikes={item.currentLikes}
                                    commentsCount={item.commentsCount}
                                />
                            </div>
                        ))
                    }
                </main>

                <button className={baseStyles.button + ' ' + styles.newCardBtn} onClick={this.onCreateCardClick}>
                    Add new card
                </button>

                {this.state.creatingCard &&
                    <Popup>
                        <NewCard onCreated={this.onCardCreation}></NewCard>
                    </Popup>
                }
            </div>
        );
    }
}

export default App;
