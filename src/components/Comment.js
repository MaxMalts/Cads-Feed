import deleteIcon from '../assets/icons/delete.svg'
import styles from './Comment.module.css';

export default function Comment(props) {
    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentContent}>
                <h5 className={styles.author}>
                    {props.commentData.author}
                </h5>
                <hr className={styles.separator} />
                <p className={styles.commentText}>
                    {props.commentData.text}
                </p>
            </div>

            <button className={styles.deleteBtn}>
                <img className={styles.deleteBtnImg} src={deleteIcon} alt='delete'/>
            </button>
        </div>
    );
}