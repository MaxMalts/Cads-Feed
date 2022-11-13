import {Link} from 'react-router-dom';
import styles from './NotFound.module.scss';

export default function HomePage() {
    return (
        <div className={styles.container}>
            <span className={styles.title}>
                404 Not Found
            </span>
            <span className={styles.additionalText}>Check the url address or</span>
            <Link className={styles.homeLink} to='/'>Go home ></Link>
        </div>
    )
}