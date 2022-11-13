import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import {getArticles} from './assets/helpers/get-articles';
import Card from './components/Card.js';
import NewCard from './components/NewCard.js';
import Popup from './components/Popup';
import baseStyles from './assets/styles/base.module.scss';
import styles from './App.module.scss';
import {dateComparator, numComparator} from './assets/helpers/sortComparators';
import SortBy from './common-components/SortBy';

const store = createStore(rootReducer);

export class App extends React.Component {
    sortTypes = [
        'date',
        'likes'
    ];

    state = {
        loading: true,
        cards: [],
        creatingCard: false,
        chosenSortType: this.sortTypes[0]
    }

    constructor(props) {
        super(props);

        this.onCreateCardClick = this.onCreateCardClick.bind(this);
        this.onCardCreation = this.onCardCreation.bind(this);
        this.sortBy = this.sortBy.bind(this);
    }

    componentDidMount() {
        getArticles().then(cards => {
            this.setState({loading: false, cards: cards});
            this.sortBy(this.state.chosenSortType);
        });
    }

    sortBy(sortType) {
        const comparator = sortType === 'date'
            ? (item1, item2) => dateComparator(item1.date, item2.date)
            : (item1, item2) => numComparator(item1.currentLikes, item2.currentLikes);

        this.setState(prev => ({
                cards: [...prev.cards].sort(comparator),
                chosenSortType: sortType
            })
        );
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
                commentsCount: 0,
                date: new Date().toISOString().split('T')[0]
            }),
            creatingCard: false
        });
    }

    render() {
        return (
            <Provider store={store}>
                <div className={styles.app}>
                    <main className={styles.pageContainer}>
                        <div className={styles.sortsContainer}>
                            <SortBy
                                options={this.sortTypes}
                                defaultOption={this.state.chosenSortType}
                                onChange={this.sortBy}
                            />
                        </div>

                        {this.state.loading
                            ? 'Loading...'
                            : this.state.cards.map(item => (
                                <div key={item.articleId} className={styles.card}>
                                    <Card
                                        articleId={item.articleId}
                                        title={item.title}
                                        text={item.text}
                                        currentLikes={item.currentLikes}
                                        curCommentsCount={item.commentsCount}
                                        date={item.date}
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
            </Provider>
        );
    }
}

export default App;
