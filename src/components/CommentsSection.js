import React, {useId} from 'react';
import Comment from './Comment.js';
import submitIcon from '../assets/icons/send.svg'
import styles from './CommentsSection.module.scss';
import baseStyles from '../assets/styles/base.module.scss';
import {getComments} from '../assets/helpers/get-comments-by-article.js';
import uuid from 'react-uuid';

export default class CommentsSection extends React.Component {
    state = {
        loading: true,
        comments: []
    }

    id;

    constructor(props) {
        super(props);

        this.nameInput = React.createRef();
        this.commentInput = React.createRef();
        this.commentForm = React.createRef();
        this.onCommentDelete = this.onCommentDelete.bind(this);
        this.onCommentSubmit = this.onCommentSubmit.bind(this);

        this.id = uuid();
        console.log(this.id);}

    componentDidMount() {
        getComments(this.props.articleId).then(comments => {
            this.setState({
                loading: false,
                comments: [...comments]
            });
        })
    }

    onSortChange(value) {
        let comparator = null;
        if (value === 'date') {
            comparator = (item1, item2) => {
                let date1 = Date.parse(item1.date);
                let date2 = Date.parse(item2.date);
                if (date1 < date2) {
                    return 1;
                } else if (date1 === date2) {
                    return 0;
                } else {
                    return -1;
                }
            };

        } else {
            comparator = (item1, item2) => {
                if (item1.currentLikes < item2.currentLikes) {
                    return 1;
                } else if (item1.currentLikes === item2.currentLikes) {
                    return 0;
                } else {
                    return -1;
                }
            };
        }

        this.setState({...this.state, comments: [...this.state.comments].sort(comparator)});
    }

    onCommentDelete(id) {
        this.setState({comments: this.state.comments.filter(item => item.id !== id)});
        this.props.onCommentDeleted();
    }

    onCommentLike(id) {
        let newComments = this.state.comments.map(item => {
            if (item.id === id) {
                return {
                    ...item,
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
                        <span>Sort by: </span>

                        <input
                            id={this.id + "-sort-by_date"} className={styles.sortsRadio}
                            type="radio"  name={this.id + "-sort-by"} value="date"
                            onChange={event => this.onSortChange(event.target.value)}
                        />
                        <label
                            className={styles.sortsLabel} htmlFor={this.id + "-sort-by_date"}
                        >date</label>

                        <input
                            id={this.id + "-sort-by_likes"} className={styles.sortsRadio}
                            type="radio" name={this.id + "-sort-by"} value="likes"
                            onChange={event => this.onSortChange(event.target.value)}
                        />
                        <label
                            className={styles.sortsLabel} htmlFor={this.id + "-sort-by_likes"}
                        >likes</label>
                    </div>
                </div>

                {this.state.loading
                    ? 'Loading...'
                    : this.state.comments.map(item => (
                        <div key={item.id} className={styles.comment}>
                            <Comment
                                commentData={item} onDelete={() => this.onCommentDelete(item.id)}
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