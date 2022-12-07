import {Link} from 'react-router-dom';
import styles from './Header.module.scss';
import getUser from '@assets/helpers/getUser';

export default function Header() {
    const user = {name: "Test User Name"};
    
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <Link to='/' className={styles.navItem}>Home</Link>
                <Link to='/articles' className={styles.navItem}>Cards</Link>
            </nav>

            <div className={styles.userContainer}>
                {user
                    ? (
                        <>
                            <div className={styles.userName}>{user.name}</div>
                            <button className={styles.signOutBtn}>Sign Out</button>
                        </>
                    )
                    : <button className={styles.loginBtn}>Login</button>
                }
            </div>
        </header>
    );
}