export default function getNewId(curElements, idExtractor) {
    if (!(curElements instanceof Array) || !(idExtractor instanceof Function)) {
        return undefined;
    }

    if (curElements.length === 0) {
        return undefined;
    }

    if (curElements.some(item => !(Number.isInteger(idExtractor(item))))) {
        return undefined;
    }

    return Math.max(0, ...curElements.map(idExtractor)) + 1;
}


