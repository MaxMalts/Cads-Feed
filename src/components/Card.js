import {useState} from 'react';
import {connect} from 'react-redux';
import Like from '../common-components/Like';
import CommentsSection from './CommentsSection.js';
import comment from '../assets/icons/comment.svg';
import styles from './Card.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const mapStateToProps = (state, {articleId}) => ({
    cardData: state.cards.find(item => item.articleId === articleId),
});

function Card({articleId, synaptic, cardData}) {
    const [curLikes] = useState(cardData.currentLikes);

    const [commentsOpened, setCommentsOpened] = useState(false);

    const onCommentClick = event => {
        event.preventDefault();
        
        if (!synaptic) {
            setCommentsOpened(!commentsOpened);
        }
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.date}>{cardData.date}</div>

            <h3 className={styles.title}>{cardData.title}</h3>
            <p className={cx({
                description: true,
                synaptic: synaptic
            })}>
                {cardData.text}
            </p>

            <div className={styles.footer}>
                <button
                    className={cx({
                        commentsContainer: true,
                        active: !synaptic
                    })}
                    {...{onClick: synaptic ? undefined : onCommentClick}}
                >
                    <div className={cx({
                            commentBtn: true,
                            btnOpened: commentsOpened
                        })}>
                        <img className={styles.commentBtnImg} src={comment} alt=''/>
                    </div>
                    <span className={styles.commentsAmt}>{cardData.commentsCount}</span>
                </button>

                <Like curLikes={curLikes} counterStyle={styles.likesAmt} likeStyle={styles.likeBtn} />
            </div>

            {commentsOpened && (
                <>
                    <hr className={styles.separator}/>
                    <CommentsSection
                        articleId={articleId}
                    ></CommentsSection>
                </>
            )}
        </div>
    );
}

export default connect(mapStateToProps)(Card);