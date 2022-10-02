import {useState} from 'react';
import like_unliked from '../assets/icons/like_unliked.svg';
import like_liked from '../assets/icons/like_liked.svg';
import styles from './Card.module.css';

export default function Card({cardData}) {
    const [curLikes, setCurLikes] = useState(cardData.currentLikes);
    const [liked, setLiked] = useState(false);

    const onLikeClick = () => {
        liked ? setCurLikes(curLikes - 1) : setCurLikes(curLikes + 1);
        setLiked(!liked);
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{cardData.title}</h3>
            <p className={styles.description}>{cardData.text}</p>

            <div className={styles.footer}>
                <span className={styles.likesAmt}>{curLikes}</span>
                <button className={styles.likeBtn + (liked ? (' ' + styles.likeBtnLiked) : '')} onClick={onLikeClick}>
                    <img src={liked ? like_liked : like_unliked} alt='' />
                </button>
            </div>
        </div>
    )
}