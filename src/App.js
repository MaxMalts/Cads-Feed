import cardsData from './assets/data/articles.json';
import Card from './components/Card.js';
import styles from './App.module.css';


function App() {
    return (
        <div className={styles.app}>
            <main className={styles.pageContainer}>
                {cardsData.map(item => (
                    <div key={item.articleId} className={styles.card}>
                        <Card
                            title={item.title}
                            text={item.text}
                            currentLikes={item.currentLikes}
                            commentsCount={item.commentsCount}
                        />
                    </div>
                ))}
            </main>
        </div>
    );
}

export default App;
