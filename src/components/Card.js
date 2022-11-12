import {useState} from 'react';
import CommentsSection from './CommentsSection.js';
import likeUnliked from '../assets/icons/likeUnliked.svg';
import likeLiked from '../assets/icons/likeLiked.svg';
import comment from '../assets/icons/comment.svg';
import styles from './Card.module.scss';
import classNames from 'classnames/bind';

export default function Card({articleId, title, text, currentLikes, curCommentsCount}) {
    const [curLikes, setCurLikes] = useState(currentLikes);
    const [liked, setLiked] = useState(false);

    const [commentsCount, setCommentsCount] = useState(curCommentsCount);
    const [commentsOpened, setCommentsOpened] = useState(false);

    const cx = classNames.bind(styles);

    const onLikeClick = () => {
        liked ? setCurLikes(curLikes - 1) : setCurLikes(curLikes + 1);
        setLiked(!liked);
    }

    const onCommentClick = () => {
        setCommentsOpened(!commentsOpened);
    }

    const onCommentAdded = () => {
        setCommentsCount(commentsCount + 1);
    }

    const onCommentDeleted = () => {
        setCommentsCount(commentsCount - 1);
    }

    return (
        <div className={styles.cardContainer}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{text}</p>

            <div className={styles.footer}>
                <div>
                    <button
                        className={cx({
                            commentBtn: true,
                            btnOpened: commentsOpened
                        })}
                        onClick={onCommentClick}
                    >
                        <img className={styles.commentBtnImg} src={comment} alt=''/>
                    </button>
                    <span className={styles.commentsAmt}>{commentsCount}</span>
                </div>

                <div>
                    <span className={styles.likesAmt}>{curLikes}</span>
                    <button
                        className={cx({
                            likeBtn: true,
                            likeBtnLiked: liked
                        })}
                        onClick={onLikeClick}
                    >
                        <img className={styles.likeBtnImg} src={liked ? likeLiked : likeUnliked} alt=''/>
                    </button>
                </div>
            </div>

            {commentsOpened && (
                <>
                    <hr className={styles.separator}/>
                    <CommentsSection
                        articleId={articleId}
                        onCommentAdded={onCommentAdded}
                        onCommentDeleted={onCommentDeleted}
                    ></CommentsSection>
                </>
            )}
        </div>
    );
}