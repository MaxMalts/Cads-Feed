export const dateComparator = (date1, date2) => {
    const date1n = Date.parse(date1);
    const date2n = Date.parse(date2);

    return date2n - date1n;
};

export const numComparator = (val1, val2) => {
    return val2 - val1;
}