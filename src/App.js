import cardsData from './assets/data.json';
import Card from './components/Card.js';
import styles from './App.module.css';


function App() {
    return (
        <div className={styles.app}>
            <main className={styles.pageContainer}>
                {cardsData.map(item => (
                    <div key={item.title} className={styles.card}>
                        <Card cardData={item}></Card>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default App;
