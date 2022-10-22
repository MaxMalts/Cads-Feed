import {useState} from 'react';
import Like from '../common-components/Like';
import CommentsSection from './CommentsSection.js';
import comment from '../assets/icons/comment.svg';
import styles from './Card.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Card({articleId, title, text, currentLikes, curCommentsCount}) {
    const [curLikes] = useState(currentLikes);

    const [commentsCount, setCommentsCount] = useState(curCommentsCount);
    const [commentsOpened, setCommentsOpened] = useState(false);

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

                <Like curLikes={curLikes} counterStyle={styles.likesAmt} likeStyle={styles.likeBtn} />
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