import {Link, useNavigate} from 'react-router-dom';
import getUser from '@assets/helpers/getUser.js';
import signOut from '@assets/helpers/signOut.js';
import baseStyles from '@assets/styles/base.module.scss';
import styles from './Header.module.scss';

export default function Header() {
    const user = getUser();
    console.log(user);

    const navigate = useNavigate();

    const onSignOut = () => {
        signOut();
        navigate(0);  // refresh
    }

    const onSignIn = () => {
        navigate('/auth');
    }

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
                            <button
                                className={baseStyles.button + ' ' + styles.signOutBtn}
                                onClick={onSignOut}
                            >
                                Sign Out
                            </button>
                        </>
                    )
                    : (
                        <button
                            className={baseStyles.button + ' ' + styles.loginBtn}
                            onClick={onSignIn}
                        >
                            Sign In
                        </button>
                    )
                }
            </div>
        </header>
    );
}