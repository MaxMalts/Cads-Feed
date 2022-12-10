import getNewId from '../assets/helpers/getNewId.js';

describe('getNewId', () => {
    test('should be a function', () => {
        expect(getNewId).toBeInstanceOf(Function);
    });

    test('should return undefined if arguments undefined', () => {
        expect(getNewId()).toBe(undefined);
    });

    test('should return undefined if idExtractor is undefined', () => {
        expect(getNewId([1, 2])).toBe(undefined);
    });

    test('should return undefined if curElements is not an array', () => {
        expect(getNewId(null, () => null)).toBe(undefined);
    });

    test('should return undefined if idExtractor is not a function', () => {
        expect(getNewId([], null)).toBe(undefined);
    });

    test('should return undefined if curElements length is 0', () => {
        expect(getNewId([], () => null)).toBe(undefined);
    });

    test('should return undefined if curElements is [{id: 5}] and idExtractor is () => null)', () => {
        expect(getNewId([{id: 5}], () => null)).toBe(undefined);
    });

    test('should return 2 if curElements is [{id: 1}] and idExtractor is (item => item.id)', () => {
        expect(getNewId([{id: 1}], item => item.id)).toBe(2);
    });

    test('should return 6 if curElements is [1, 2, 5] and idExtractor is (item => item)', () => {
        expect(getNewId([1, 2, 5], item => item)).toBe(6);
    });
});