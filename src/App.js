import React from 'react';
import {Routes, Route} from 'react-router-dom'

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '@store/reducers/rootReducer';

import HomePage from '@pages/HomePage.js';
import NotFound from '@pages/NotFound.js';
import LoginPage from '@pages/LoginPage.js';
import CardsFeed from '@pages/CardsFeed.js';
import CardPage from '@pages/CardPage.js';

import styles from './App.module.scss';
import Header from '@components/Header';

const store = createStore(rootReducer);

const App = () => (
    <Provider store={store}>
        <div className={styles.app}>
            <Header/>

            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/auth' element={<LoginPage/>}/>
                <Route path='/articles' element={<CardsFeed/>}/>
                <Route path='/articles/:articleId' element={<CardPage/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </div>
    </Provider>
);

export default App;