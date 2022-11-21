import Like from '@common-components/Like';
import deleteIcon from '@assets/icons/delete.svg'
import styles from './Comment.module.scss';

export default function Comment({commentData, onDelete}) {
    return (
        <div className={styles.commentContainer}>
            <div className={styles.header}>
                <div className={styles.date}>{commentData.date}</div>
                <button className={styles.deleteBtn} onClick={onDelete}>
                    <img className={styles.deleteBtnImg} src={deleteIcon} alt="delete"/>
                </button>
            </div>

            <div className={styles.commentContent}>
                <h5 className={styles.author}>
                    {commentData.author}
                </h5>
                <hr className={styles.separator}/>
                <p className={styles.commentText}>
                    {commentData.text}
                </p>
            </div>

            <div className={styles.likesContainer}>
                <Like
                    curLikes={commentData.currentLikes} counterStyle={styles.likesAmt}
                    likeStyle={styles.likeBtn}
                />
            </div>
        </div>
    );
}