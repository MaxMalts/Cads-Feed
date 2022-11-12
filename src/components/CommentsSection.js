import React from 'react';
import Comment from './Comment.js';
import submitIcon from '../assets/icons/send.svg'
import styles from './CommentsSection.module.scss';
import baseStyles from '../assets/styles/base.module.scss';
import {getComments} from '../assets/helpers/get-comments-by-article.js';
import {dateComparator, numComparator} from '../assets/helpers/sortComparators';
import SortBy from '../common-components/SortBy.js';

export default class CommentsSection extends React.Component {
    sortTypes = [
        'date',
        'likes'
    ];

    state = {
        loading: true,
        comments: [],
        chosenSortType: this.sortTypes[0]
    }

    constructor(props) {
        super(props);

        this.nameInput = React.createRef();
        this.commentInput = React.createRef();
        this.commentForm = React.createRef();
        this.onCommentDelete = this.onCommentDelete.bind(this);
        this.onCommentSubmit = this.onCommentSubmit.bind(this);
        this.sortBy = this.sortBy.bind(this);
    }

    componentDidMount() {
        getComments(this.props.articleId).then(comments => {
            this.setState({loading: false, comments: comments});
            this.sortBy(this.state.chosenSortType);
        });
    }

    sortBy(sortType) {
        const comparator = sortType === 'date'
            ? (item1, item2) => dateComparator(item1.date, item2.date)
            : (item1, item2) => numComparator(item1.currentLikes, item2.currentLikes);

        this.setState(prev => ({
                comments: [...prev.comments].sort(comparator),
                chosenSortType: sortType
            })
        );
    }

    onCommentDelete(id) {
        this.setState(prev => ({comments: prev.comments.filter(item => item.id !== id)}));
        this.props.onCommentDeleted();
    }

    onCommentLike(id) {
        let newComments = this.state.comments.map(item => {
            if (item.id === id) {
                return {
                    currentLikes: item.currentLikes + 1
                };
            } else {
                return item;
            }
        })
        
        this.setState({comments: newComments});
    }

    onCommentSubmit(event) {
        event.preventDefault();

        this.setState({
            comments: this.state.comments.concat({
                id: Math.max(0, ...this.state.comments.map(item => item.id)) + 1,
                author: this.nameInput.current.value,
                articleId: this.props.articleId,
                text: this.commentInput.current.value,
                currentLikes: 0,
                date: new Date().toISOString().split('T')[0]
            })
        });

        this.commentForm.current.reset();
        this.props.onCommentAdded();
    }

    render() {
        return (
            <div className={styles.commentsContainer}>
                <div className={styles.header}>
                    <div className={styles.sortsContainer}>
                        <SortBy
                            options={this.sortTypes} defaultOption={this.state.chosenSortType}
                            onChange={this.sortBy}
                        />
                    </div>
                </div>

                {this.state.loading
                    ? 'Loading...'
                    : this.state.comments.map(item => (
                        <div key={item.id} className={styles.comment}>
                            <Comment
                                commentData={item}
                                onDelete={() => this.onCommentDelete(item.id)}
                                onLike={() => this.onCommentLike(item.id)}
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