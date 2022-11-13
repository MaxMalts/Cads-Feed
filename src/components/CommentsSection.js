import React from 'react';

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

class CommentsSection extends React.Component {
    sortTypes = [
        'date',
        'likes'
    ];

    state = {
        loading: true,
        chosenSortType: this.sortTypes[0]
    }

    constructor(props) {
        super(props);

        this.nameInput = React.createRef();
        this.commentInput = React.createRef();
        this.commentForm = React.createRef();
        this.onCommentDelete = this.onCommentDelete.bind(this);
        this.onCommentSubmit = this.onCommentSubmit.bind(this);
        this.setSortType = this.setSortType.bind(this);
    }

    componentDidMount() {
        getComments(this.props.articleId).then(comments => {
            this.props.loadComments(comments);
            this.setState({loading: false});
        });
    }

    setSortType(sortType) {
        this.setState({chosenSortType: sortType});
    }

    getSortedComments() {
        const comparator = this.state.chosenSortType === 'date'
            ? (item1, item2) => dateComparator(item1.date, item2.date)
            : (item1, item2) => numComparator(item1.currentLikes, item2.currentLikes);

        return [...this.props.comments].sort(comparator);
    }

    onCommentDelete(id) {
        this.props.deleteComment(id);
    }

    onCommentSubmit(event) {
        event.preventDefault();
        this.props.addComment(this.nameInput.current.value, this.commentInput.current.value);
        this.commentForm.current.reset();
    }

    render() {
        const sortedComments = this.getSortedComments();

        return (
            <div className={styles.commentsContainer}>
                <div className={styles.header}>
                    <div className={styles.sortsContainer}>
                        <SortBy
                            options={this.sortTypes} defaultOption={this.state.chosenSortType}
                            onChange={this.setSortType}
                        />
                    </div>
                </div>

                {this.state.loading
                    ? 'Loading...'
                    : sortedComments.map(item => (
                        <div key={item.id} className={styles.comment}>
                            <Comment
                                commentData={item}
                                onDelete={() => this.onCommentDelete(item.id)}
                            ></Comment>
                        </div>
                    ))
                }

                <form
                    className={styles.commentForm} ref={this.commentForm} name='newComment'
                    onSubmit={this.onCommentSubmit}
                >
                    <input
                        className={baseStyles.inputField + ' ' + styles.nameInput}
                        ref={this.nameInput} type="text"
                        name="name"
                        placeholder="Enter your name" maxLength="50" required
                    />
                    <textarea
                        className={baseStyles.inputField + ' ' + styles.commentInput}
                        ref={this.commentInput}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection);