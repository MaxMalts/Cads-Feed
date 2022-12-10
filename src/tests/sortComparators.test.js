import {dateComparator, numComparator} from '../assets/helpers/sortComparators';

describe('dateComparator', () => {
    test('should be a function', () => {
        expect(dateComparator).toBeInstanceOf(Function);
    });

    test('should return undefined if date1 is undefined', () => {
        expect(dateComparator()).toBe(undefined);
    });

    test('should return undefined if date2 is undefined', () => {
        expect(dateComparator('2022-01-01')).toBe(undefined);
    });

    test('should return undefined if date1 is not a string', () => {
        expect(dateComparator(null)).toBe(undefined);
    });

    test('should return undefined if date2 is not a string', () => {
        expect(dateComparator('2022-01-01', null)).toBe(undefined);
    });

    test('should return 0 if date1 and date2 are both "2022-01-01"', () => {
        expect(dateComparator('2022-01-01', '2022-01-01')).toBe(0);
    });

    test('should return < 0 if date1 is "2022-01-01" and date2 is "2022-01-02"', () => {
        expect(dateComparator('2022-01-01', '2022-01-02')).toBeLessThan(0);
    });

    test('should return > 0 if date1 is "2022-01-02" and date2 is "2022-01-01"', () => {
        expect(dateComparator('2022-01-02', '2022-01-01')).toBeGreaterThan(0);
    });
});

describe('numComparator', () => {
    test('should be a function', () => {
        expect(numComparator).toBeInstanceOf(Function);
    });

    test('should return undefined if val1 is undefined', () => {
        expect(numComparator()).toBe(undefined);
    });

    test('should return undefined if val2 is undefined', () => {
        expect(numComparator(1)).toBe(undefined);
    });

    test('should return undefined if val1 is not a number', () => {
        expect(numComparator(null)).toBe(undefined);
    });

    test('should return undefined if val2 is not a number', () => {
        expect(numComparator(1, null)).toBe(undefined);
    });

    test('should return 0 if val1 and val2 are both 1', () => {
        expect(numComparator(1, 1)).toBe(0);
    });

    test('should return < 0 if val1 is 1 and val2 is 2', () => {
        expect(numComparator(2, 1)).toBeLessThan(0);
    });

    test('should return > 0 if val1 is 2 and val2 is 1', () => {
        expect(numComparator(1, 2)).toBeGreaterThan(0);
    });
});