export default function getNewId(curElements, idExtractor) {
    return Math.max(0, ...curElements.map(idExtractor)) + 1;
}


