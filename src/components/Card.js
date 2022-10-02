import {useState} from 'react';
import like_unliked from '../assets/like_unliked.svg';
import like_liked from '../assets/like_liked.svg';

export default function Card({cardData}) {
    const [curLikes, setCurLikes] = useState(cardData.currentLikes);
    const [liked, setLiked] = useState(false);

    const onLikeClick = () => {
        liked ? setCurLikes(curLikes - 1) : setCurLikes(curLikes + 1);
        setLiked(!liked);
    }
    console.log(cardData);

    return (
        <div>
            <div>{cardData.title}</div>
            <div>{cardData.text}</div>
            <div>
                {curLikes}
                <img src={liked ? like_liked : like_unliked} alt='' onClick={onLikeClick}/>
            </div>
        </div>
    )
}