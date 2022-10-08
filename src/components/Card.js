import {useState} from 'react';
import likeUnliked from '../assets/icons/likeUnliked.svg';
import likeLiked from '../assets/icons/likeLiked.svg';
import comment from '../assets/icons/comment.svg';
import styles from './Card.module.css';

export default function Card({title, text, currentLikes, commentsCount}) {
    const [curLikes, setCurLikes] = useState(currentLikes);
    const [liked, setLiked] = useState(false);

    const [curComments, setCurComments] = useState(commentsCount);
    const [commentsOpened, setCommentsOpened] = useState(false);

    const onLikeClick = () => {
        liked ? setCurLikes(curLikes - 1) : setCurLikes(curLikes + 1);
        setLiked(!liked);
    }

    const onCommentClick = () => {
        setCommentsOpened(!commentsOpened);
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{text}</p>

            <div className={styles.footer}>
                <div className={styles.comment}>
                    <button
                        className={styles.commentBtn + (commentsOpened ? (' ' + styles.commentBtnOpened) : '')}
                        onClick={onCommentClick}
                    >
                        <img className={styles.commentBtnImg} src={comment} alt='' />
                    </button>
                    <span className={styles.commentsAmt}>{curComments}</span>
                </div>

                <div className={styles.like}>
                    <span className={styles.likesAmt}>{curLikes}</span>
                    <button className={styles.likeBtn + (liked ? (' ' + styles.likeBtnLiked) : '')} onClick={onLikeClick}>
                        <img className={styles.likeBtnImg} src={liked ? likeLiked : likeUnliked} alt='' />
                    </button>
                </div>
            </div>
        </div>
    )
}