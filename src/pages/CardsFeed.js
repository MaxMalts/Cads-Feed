import React, {useEffect, useState} from 'react';
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
});

const sortTypes = [
    'date',
    'likes'
];

function CardsFeed({cards, loadCards, addCard}) {
    const [loading, setLoading] = useState(true);
    const [creatingCard, setCreatingCard] = useState(false);
    const [chosenSortType, setChosenSortType] = useState(sortTypes[0]);

    useEffect(() => {
        getArticles().then(cards => {
            loadCards(cards);
            setLoading(false);
        });
    }, [loadCards]);

    const getSortedCards = () => {
        const comparator = chosenSortType === 'date'
            ? (item1, item2) => dateComparator(item1.date, item2.date)
            : (item1, item2) => numComparator(item1.currentLikes, item2.currentLikes);

        return [...cards].sort(comparator);
    };

    const onCreateCardClick = () => {
        setCreatingCard(true);
    };

    const onCardCreation = (title, description) => {
        addCard(title, description);
        setCreatingCard(false);
    };

    const sortedCards = getSortedCards();

    return (
        <>
            <main className={styles.feedContainer}>
                <div className={styles.sortsContainer}>
                    <SortBy
                        options={sortTypes}
                        defaultOption={chosenSortType}
                        onChange={setChosenSortType}
                    />
                </div>

                {loading
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

            <button className={baseStyles.button + ' ' + styles.newCardBtn} onClick={onCreateCardClick}>
                Add new card
            </button>

            {creatingCard &&
                <Popup>
                    <NewCard onCreated={onCardCreation}></NewCard>
                </Popup>
            }
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsFeed);