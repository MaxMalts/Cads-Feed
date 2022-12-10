export const dateComparator = (date1, date2) => {
    if (!(date1 instanceof String) && !(typeof date1 === 'string')) {
        return undefined;
    }

    if (!(date2 instanceof String) && !(typeof date2 === 'string')) {
        return undefined;
    }

    const date1n = Date.parse(date1);
    const date2n = Date.parse(date2);

    return date1n - date2n;
};

export const numComparator = (val1, val2) => {
    if (!(val1 instanceof Number) && !(typeof val1 === 'number')) {
        return undefined;
    }

    if (!(val2 instanceof Number) && !(typeof val2 === 'number')) {
        return undefined;
    }

    return val2 - val1;
}