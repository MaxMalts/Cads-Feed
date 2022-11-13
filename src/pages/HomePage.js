import {Link} from 'react-router-dom';
import styles from './HomePage.module.scss';

export default function HomePage() {
    return (
        <div className={styles.container}>
            <span className={styles.text}>
                Welcome to my portfolio React application!
            </span>
            <Link className={styles.cardsLink} to='/articles'>Go to cards feed ></Link>
        </div>
    )
}