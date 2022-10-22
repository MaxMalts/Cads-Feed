import deleteIcon from '../assets/icons/delete.svg'
import styles from './Comment.module.scss';
import Like from '../common-components/Like';

export default function Comment({commentData, onLike, onDelete}) {
    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentContent}>
                <h5 className={styles.author}>
                    {commentData.author}
                </h5>
                <hr className={styles.separator}/>
                <p className={styles.commentText}>
                    {commentData.text}
                </p>
            </div>

            <button className={styles.deleteBtn} onClick={onDelete}>
                <img className={styles.deleteBtnImg} src={deleteIcon} alt="delete"/>
            </button>

            <div className={styles.likesContainer}>
                <Like
                    curLikes={commentData.currentLikes} counterStyle={styles.likesAmt}
                    likeStyle={styles.likeBtn}
                />
            </div>
        </div>
    );
}