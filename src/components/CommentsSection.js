import React, {useCallback, useEffect, useReducer, useRef, useState} from 'react';

import {connect} from 'react-redux';
import {
    actionAddComment,
    actionDeleteComment,
    actionLoadCardComments
} from '@store/actions/commentsActions.js';

import {getComments} from '@assets/server-mocks/getCommentsByArticle.js';
import {dateComparator, numComparator} from '@assets/helpers/sortComparators';
import getUser from '@assets/server-mocks/getUser.js';

import Comment from '@components/Comment.js';
import SortBy from '@common-components/SortBy.js';

import submitIcon from '@assets/icons/send.svg';

import baseStyles from '@assets/styles/base.module.scss';
import styles from './CommentsSection.module.scss';

const mapStateToProps = (state, {articleId}) => ({
    comments: state.cards.find(item => item.articleId === articleId).comments
});

const mapDispatchToProps = (dispatch, {articleId}) => ({
    loadComments: comments => dispatch(actionLoadCardComments(articleId, comments)),
    addComment: (author, text) => dispatch(actionAddComment(articleId, author, text)),
    deleteComment: id => dispatch(actionDeleteComment(articleId, id))
});

const actionSetCommentField = 'SET_COMMENT_FIELD';
const actionClearFields = 'CLEAR_FIELDS';

function commentFieldsReducer(state, action) {
    switch(action.type) {
        case actionSetCommentField: {
            return {
                ...state,
                comment: action.payload.comment
            };
        }
        case actionClearFields: {
            return {
                ...state,
                name: '',
                comment: '',
            };
        }
        default: {
            return state;
        }
    }
}

const sortTypes = [
    'date',
    'likes'
];

function CommentsSection({articleId, comments, loadComments, addComment, deleteComment}) {
    const [loading, setLoading] = useState(true);
    const [chosenSortType, setChosenSortType] = useState(sortTypes[0]);

    const commentForm = useRef(null);

    useEffect(() => {
        getComments(articleId)
            .then(comments => {
                loadComments(comments);
                setLoading(false);
            })
            .catch(error => console.error(
                `Error while loading comments on card with id ${articleId}.`,
                error
            ));
    }, [articleId, loadComments]);

    const [commentFields, commentFieldsDispatch] = useReducer(
        commentFieldsReducer,
        {comment: ''}
    );

    const getSortedComments = () => {
        const comparator = chosenSortType === 'date'
            ? (item1, item2) => dateComparator(item1.date, item2.date)
            : (item1, item2) => numComparator(item1.currentLikes, item2.currentLikes);

        return [...comments].sort(comparator);
    };

    const onCommentSubmit = useCallback(event => {
        event.preventDefault();
        const user = getUser();
        addComment(user ? user.name : 'Anonym', commentFields.comment);
        commentForm.current.reset();
        commentFieldsDispatch({type: actionClearFields});
    }, [addComment, commentFields]);

    const sortedComments = getSortedComments();

    return (
        <div className={styles.commentsContainer}>
            <div className={styles.header}>
                <div className={styles.sortsContainer}>
                    <SortBy
                        options={sortTypes} defaultOption={chosenSortType}
                        onChange={setChosenSortType}
                    />
                </div>
            </div>

            {loading
                ? 'Loading...'
                : sortedComments.map(item => (
                    <div key={item.id} className={styles.comment}>
                        <Comment
                            commentData={item}
                            onDelete={() => deleteComment(item.id)}
                        ></Comment>
                    </div>
                ))
            }

            <form
                className={styles.commentForm} ref={commentForm} name='newComment'
                onSubmit={onCommentSubmit}
            >
                <textarea
                    className={baseStyles.inputField + ' ' + styles.commentInput}
                    name="comment"
                    placeholder="Enter your comment"
                    required
                    onChange={event => commentFieldsDispatch({
                        type: actionSetCommentField,
                        payload: {
                            comment: event.target.value
                        }
                    })}
                />
                <button className={baseStyles.button + ' ' + styles.submitBtn} type='submit'>
                    <span className={styles.submitBtnText}>Comment</span>
                    <img className={styles.submitBtnImg} src={submitIcon} alt='send'/>
                </button>
            </form>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection);