import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import CardsFeed from './components/CardsFeed.js';
import styles from './App.module.scss';

const store = createStore(rootReducer);

const App = () => (
    <Provider store={store}>
        <div className={styles.app}>
            <CardsFeed/>
        </div>
    </Provider>
);

export default App;