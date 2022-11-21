import comments from '@assets/data/comments.json'
import emulateError from '@assets/helpers/emulate-error.js';

const COMMENTS_LOAD_DURATION = 1000;

function selectByArticleId(totalData, id) {
    return totalData.filter(({articleId}) => articleId === id)
}

export async function getComments(articleId) {
    return new Promise(resolve => {
        emulateError();

        const targetComments = selectByArticleId(comments, articleId)
        setTimeout(() => resolve(targetComments), COMMENTS_LOAD_DURATION)
    })
}