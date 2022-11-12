import deleteIcon from '../assets/icons/delete.svg'
import styles from './Comment.module.scss';

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

            <button className={styles.deleteBtn} onClick={props.onDelete}>
                <img className={styles.deleteBtnImg} src={deleteIcon} alt='delete'/>
            </button>
        </div>
    );
}