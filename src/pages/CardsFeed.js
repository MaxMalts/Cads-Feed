import React from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {actionAddCard, actionLoadCards} from '../store/actions/cardsActions.js';

import {getArticles} from '../assets/helpers/get-articles.js';
import {dateComparator, numComparator} from '../assets/helpers/sortComparators.js';

import Card from '../components/Card.js';
import NewCard from '../components/NewCard.js';
import Popup from '../components/Popup.js';
import SortBy from '../common-components/SortBy.js';

import baseStyles from '../assets/styles/base.module.scss';
import styles from './CardsFeed.module.scss';

const mapStateToProps = state => ({
    cards: state.cards
});

const mapDispatchToProps = dispatch => ({
    loadCards: cards => dispatch(actionLoadCards(cards)),
    addCard: (title, description) => dispatch(actionAddCard(title, description))
})

class CardsFeed extends React.Component {
    sortTypes = [
        'date',
        'likes'
    ];

    state = {
        loading: true,
        creatingCard: false,
        chosenSortType: this.sortTypes[0]
    }

    constructor(props) {
        super(props);

        this.onCreateCardClick = this.onCreateCardClick.bind(this);
        this.onCardCreation = this.onCardCreation.bind(this);
        this.setSortType = this.setSortType.bind(this);
    }

    componentDidMount() {
        getArticles().then(cards => {
            this.props.loadCards(cards);
            this.setState({loading: false});
        });
    }

    setSortType(sortType) {
        this.setState({chosenSortType: sortType});
    }

    getSortedCards() {
        const comparator = this.state.chosenSortType === 'date'
            ? (item1, item2) => dateComparator(item1.date, item2.date)
            : (item1, item2) => numComparator(item1.currentLikes, item2.currentLikes);

        return [...this.props.cards].sort(comparator);
    }

    onCreateCardClick() {
        this.setState({creatingCard: true});
    }

    onCardCreation(title, description) {
        this.props.addCard(title, description);
        this.setState({creatingCard: false});
    }

    render() {
        const sortedCards = this.getSortedCards();

        return (
            <>
                <main className={styles.feedContainer}>
                    <div className={styles.sortsContainer}>
                        <SortBy
                            options={this.sortTypes}
                            defaultOption={this.state.chosenSortType}
                            onChange={this.setSortType}
                        />
                    </div>

                    {this.state.loading
                        ? 'Loading...'
                        : sortedCards.map(item => (
                            <div key={item.articleId} className={styles.card}>
                                <Link className={styles.cardLink} to={`${item.articleId}`}>
                                    <Card
                                        articleId={item.articleId}
                                        synaptic={true}
                                    />
                                </Link>
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
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsFeed);