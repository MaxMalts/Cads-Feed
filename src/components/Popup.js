import styles from './Popup.module.css';

export default function Popup({children}) {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.overlay}></div>
            <div className={styles.popup}>
                {children}
            </div>
        </div>
    );
}