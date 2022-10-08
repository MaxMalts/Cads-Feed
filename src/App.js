import React from 'react';
import {getArticles} from './assets/helpers/get-articles';
import Card from './components/Card.js';
import styles from './App.module.css';


export class App extends React.Component {
    state = {
        loading: true,
        cards: []
    }

    componentDidMount() {
        getArticles().then(cards => {
            this.setState({
                loading: false,
                cards: cards
            });
        })
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
            </div>
        );
    }
}

export default App;
