import './App.css';
import cardsData from './assets/data.json';
import Card from './components/Card.js';

function App() {
  return (
    <div className="App">
      {cardsData.map(item => <Card key={item.title} cardData={item}></Card>)}
    </div>
  );
}

export default App;
