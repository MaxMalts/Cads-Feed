import {useState} from 'react';
import likeLiked from '../assets/icons/likeLiked.svg';
import likeUnliked from '../assets/icons/likeUnliked.svg';
import styles from './Like.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Like({curLikes, counterStyle, likeStyle}) {
    const [liked, setLiked] = useState(false);

    const onLikeClick = () => {
        setLiked(!liked);
    }

    return (
        <div className={styles.container}>
            <span className={classNames(styles.likesAmt, counterStyle)}>{curLikes + (liked ? 1 : 0)}</span>
            <button
                className={classNames(cx({
                    likeBtn: true,
                    likeBtnLiked: liked
                }), likeStyle)}
                onClick={onLikeClick}
            >
                <img className={styles.likeBtnImg} src={liked ? likeLiked : likeUnliked} alt=''/>
            </button>
        </div>
    );
}