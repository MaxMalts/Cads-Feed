import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom'
import rootReducer from './store/reducers/rootReducer';
import HomePage from './pages/HomePage.js';
import CardsFeed from './pages/CardsFeed.js';
import CardPage from './pages/CardPage.js';
import NotFound from './pages/NotFound.js';
import styles from './App.module.scss';

const store = createStore(rootReducer);

const App = () => (
    <Provider store={store}>
        <div className={styles.app}>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/articles' element={<CardsFeed/>}/>
                <Route path='/articles/:articleId' element={<CardPage/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </div>
    </Provider>
);

export default App;