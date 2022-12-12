import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {connect} from 'react-redux';
import {actionLoadCards} from '@store/actions/cardsActions';

import Card from '@components/Card';
import NotFound from '@pages/NotFound.js';
import {getArticles} from '@assets/server-mocks/getArticles';

import styles from './CardPage.module.scss';

const mapDispatchToProps = dispatch => ({
    loadCards: cards => dispatch(actionLoadCards(cards))
});

function CardPage({loadCards}) {
    const articleId = parseInt(useParams().articleId);

    let [notFound, setNotFound] = useState(false);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        if (Number.isNaN(articleId)) {
            setNotFound(true);
        }

        getArticles().then(cards => {
            loadCards(cards);
            if (cards.some(item => item.articleId === articleId)) {
                console.log(`${new Date().toString()}: visited the card with id ${articleId}.`);
            } else {
                setNotFound(true);
            }
            setLoading(false);
        });
    }, [articleId, loadCards]);

    return notFound
        ? <NotFound/>
        : (
            <main className={styles.cardContainer}>
                {loading
                    ? 'Loading...'
                    : <Card articleId={articleId} synaptic={false}/>
                }
            </main>
        );
}

export default connect(null, mapDispatchToProps)(CardPage);