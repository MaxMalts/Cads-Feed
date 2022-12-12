import articles from '@assets/server-mocks/data/articles.json'
import emulateError from '@assets/server-mocks/emulateError.js';

const ARTICLES_LOAD_DURATION = 1500;

export async function getArticles() {
    return new Promise(resolve => {
        emulateError();
        setTimeout(() => resolve(articles), ARTICLES_LOAD_DURATION)
    })
}