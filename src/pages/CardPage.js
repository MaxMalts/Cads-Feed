import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {connect} from 'react-redux';
import {actionLoadCards} from '../store/actions/cardsActions';

import Card from '../components/Card';
import {getArticles} from '../assets/helpers/get-articles';

const mapStateToProps = state => ({
    cards: state.cards
});

const mapDispatchToProps = dispatch => ({
    loadCards: cards => dispatch(actionLoadCards(cards))
})

function CardPage({loadCards}) {
    const articleId = parseInt(useParams().articleId);

    let [loading, setLoading] = useState(true);

    useEffect(() => {
        getArticles().then(cards => {
            console.log("loaded");
            loadCards(cards);
            setLoading(false);
        });
    }, []);

    return (
        <main>
            {loading
                ? 'Loading...'
                : <Card articleId={articleId} synaptic={false}/>
            }
        </main>

    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);