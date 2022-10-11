import React from 'react';
import Comment from './Comment.js';
import submitIcon from '../assets/icons/send.svg'
import styles from './CommentsSection.module.css';
import baseStyles from '../assets/styles/base.module.css';
import {getComments} from '../assets/helpers/get-comments-by-article.js';

export default class CommentsSection extends React.Component {
    state = {
        comments: []
    }

    constructor(props) {
        super(props);

        this.nameInput = React.createRef();
        this.commentInput = React.createRef();
        this.commentForm = React.createRef();
        this.onCommentDelete = this.onCommentDelete.bind(this);
        this.onCommentSubmit = this.onCommentSubmit.bind(this);
    }

    componentDidMount() {
        getComments(this.props.articleId).then(comments => {
            this.setState({comments: [...comments]});
        })
    }

    onCommentDelete(id) {
        this.setState({comments: this.state.comments.filter(item => item.id !== id)});
        this.props.onCommentDeleted();
    }

    onCommentSubmit(event) {
        event.preventDefault();

        this.setState({
            comments: this.state.comments.concat({
                id: this.state.comments.reduce((prev, cur) => prev > cur.id ? prev : cur.id, 0) + 1,  // max + 1
                author: this.nameInput.current.value,
                articleId: this.props.articleId,
                text: this.commentInput.current.value
            })
        });

        this.commentForm.current.reset();
        this.props.onCommentAdded();
    }

    render() {
        return (
            <div className={styles.commentsContainer}>
                {this.state.comments.map(item => (
                    <div key={item.id} className={styles.comment}>
                        <Comment commentData={item} onDelete={() => this.onCommentDelete(item.id)}></Comment>
                    </div>
                ))}

                <form
                    className={styles.commentForm} ref={this.commentForm} name='newComment'
                    onSubmit={this.onCommentSubmit}
                >
                    <input
                        className={baseStyles.inputField + ' ' + styles.nameInput} ref={this.nameInput} type='text'
                        name='name'
                        placeholder='Enter your name' maxLength='50' required
                    />
                    <textarea
                        className={baseStyles.inputField + ' ' + styles.commentInput} ref={this.commentInput}
                        name='comment'
                        placeholder='Enter your comment'
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