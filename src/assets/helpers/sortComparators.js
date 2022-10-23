export const dateComparator = (date1, date2) => {
    let date1n = Date.parse(date1);
    let date2n = Date.parse(date2);
    if (date1n < date2n) {
        return 1;
    } else if (date1n === date2n) {
        return 0;
    } else {
        return -1;
    }
};

export const numComparator = (val1, val2) => {
    if (val1 < val2) {
        return 1;
    } else if (val1 === val2) {
        return 0;
    } else {
        return -1;
    }
}