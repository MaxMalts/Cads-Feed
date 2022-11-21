import articles from '../data/articles.json'
import emulateError from './emulate-error';

const ARTICLES_LOAD_DURATION = 1500;

export async function getArticles() {
    return new Promise(resolve => {
        emulateError();
        setTimeout(() => resolve(articles), ARTICLES_LOAD_DURATION)
    })
}