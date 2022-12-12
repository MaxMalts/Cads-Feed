import getCurDate from '../assets/helpers/getCurDate.js';

let origDate = global.Date;

beforeAll(() => {
    global.Date = class extends origDate {
        constructor() {
            super(1487076708000);
        }
    }
})

describe('getCurDate', () => {
    test('should be a function', () => {
        expect(getCurDate).toBeInstanceOf(Function);
    });

    test('should return current date', () => {
        expect(getCurDate()).toBe(new Date().toISOString().split('T')[0]);
    })
});

afterAll(() => {
    global.Date = origDate;
})