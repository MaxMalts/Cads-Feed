import deleteIcon from '../assets/icons/delete.svg'
import styles from './Comment.module.css';

export default function Comment({commentData}) {
    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentContent}>
                <h5 className={styles.author}>
                    {commentData.author}
                </h5>
                <hr className={styles.separator} />
                <p className={styles.commentText}>
                    {commentData.text}
                </p>
            </div>

            <button className={styles.deleteBtn}>
                <img className={styles.deleteBtnImg} src={deleteIcon} alt='delete'/>
            </button>
        </div>
    );
}