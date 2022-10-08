import React from 'react';
import Comment from './Comment.js';
import styles from './CommentsSection.module.css';
import {getComments} from '../assets/helpers/get-comments-by-article.js';

export default class CommentsSection extends React.Component {
    state = {
        comments: []
    }

    componentDidMount() {

        getComments(this.props.articleId).then(comments => {
            this.setState({comments: [...comments]});
        })
    }

    render() {
        return (
            <div className={styles.commentsContainer}>
                {this.state.comments.map(item => (
                    <div key={item.text} className={styles.comment}>
                        <Comment commentData={item}></Comment>
                    </div>
                ))}
            </div>
        );
    }
}