import React, {useEffect, useRef, useState} from 'react';

import {connect} from 'react-redux';
import {
    actionAddComment,
    actionDeleteComment,
    actionLoadCardComments
} from '../store/actions/commentsActions.js';

import {getComments} from '../assets/helpers/get-comments-by-article.js';
import {dateComparator, numComparator} from '../assets/helpers/sortComparators';

import Comment from './Comment.js';
import SortBy from '../common-components/SortBy.js';

import submitIcon from '../assets/icons/send.svg';

import baseStyles from '../assets/styles/base.module.scss';
import styles from './CommentsSection.module.scss';

const mapStateToProps = (state, {articleId}) => ({
    comments: state.cards.find(item => item.articleId === articleId).comments
});

const mapDispatchToProps = (dispatch, {articleId}) => ({
    loadComments: comments => dispatch(actionLoadCardComments(articleId, comments)),
    addComment: (author, text) => dispatch(actionAddComment(articleId, author, text)),
    deleteComment: id => dispatch(actionDeleteComment(articleId, id))
});

const sortTypes = [
    'date',
    'likes'
];

function CommentsSection({articleId, comments, loadComments, addComment, deleteComment}) {
    const [loading, setLoading] = useState(true);
    const [chosenSortType, setChosenSortType] = useState(sortTypes[0]);

    const nameInput = useRef(null);
    const commentInput = useRef(null);
    const commentForm = useRef(null);

    useEffect(() => {
        getComments(articleId).then(comments => {
            loadComments(comments);
            setLoading(false);
        });
    }, [articleId, loadComments]);

    const getSortedComments = () => {
        const comparator = chosenSortType === 'date'
            ? (item1, item2) => dateComparator(item1.date, item2.date)
            : (item1, item2) => numComparator(item1.currentLikes, item2.currentLikes);

        return [...comments].sort(comparator);
    };

    const onCommentSubmit = event => {
        event.preventDefault();
        addComment(nameInput.current.value, commentInput.current.value);
        commentForm.current.reset();
    };

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
                <input
                    className={baseStyles.inputField + ' ' + styles.nameInput}
                    ref={nameInput} type="text"
                    name="name"
                    placeholder="Enter your name" maxLength="50" required
                />
                <textarea
                    className={baseStyles.inputField + ' ' + styles.commentInput}
                    ref={commentInput}
                    name="comment"
                    placeholder="Enter your comment"
                    required
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