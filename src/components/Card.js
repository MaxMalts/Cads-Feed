import {useState} from 'react';
import Like from '../common-components/Like';
import CommentsSection from './CommentsSection.js';
import comment from '../assets/icons/comment.svg';
import styles from './Card.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Card({articleId, title, text, currentLikes, curCommentsCount, date}) {
    const [curLikes] = useState(currentLikes);

    const [commentsCount/*, setCommentsCount*/] = useState(curCommentsCount);
    const [commentsOpened, setCommentsOpened] = useState(false);

    const onCommentClick = () => {
        setCommentsOpened(!commentsOpened);
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.date}>{date}</div>

            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{text}</p>

            <div className={styles.footer}>
                <button className={styles.commentsContainer} onClick={onCommentClick}>
                    <div className={cx({
                            commentBtn: true,
                            btnOpened: commentsOpened
                        })}>
                        <img className={styles.commentBtnImg} src={comment} alt=''/>
                    </div>
                    <span className={styles.commentsAmt}>{commentsCount}</span>
                </button>

                <Like curLikes={curLikes} counterStyle={styles.likesAmt} likeStyle={styles.likeBtn} />
            </div>

            {commentsOpened && (
                <>
                    <hr className={styles.separator}/>
                    <CommentsSection
                        articleId={articleId}
                    ></CommentsSection>
                </>
            )}
        </div>
    );
}