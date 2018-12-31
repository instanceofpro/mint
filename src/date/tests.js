import date, {
    add,
    clone,
    compare,
    endOf,
    equals,
    format,
    isFuture,
    isLeapYear,
    isPast,
    isToday,
    isTomorrow,
    isValid,
    isYesterday,
    startOf,
    today,
    tomorrow,
    yesterday
} from '.';

describe('doremi/date', () => {
    test('imports doremi/date as object', () => {
        expect(date).toEqual(expect.any(Object));
    });

    test('doremi/date has correct properties', () => {
        expect(date).toHaveProperty('add', add);
        expect(date).toHaveProperty('clone', clone);
        expect(date).toHaveProperty('compare', compare);
        expect(date).toHaveProperty('endOf', endOf);
        expect(date).toHaveProperty('equals', equals);
        expect(date).toHaveProperty('format', format);
        expect(date).toHaveProperty('isFuture', isFuture);
        expect(date).toHaveProperty('isLeapYear', isLeapYear);
        expect(date).toHaveProperty('isPast', isPast);
        expect(date).toHaveProperty('isToday', isToday);
        expect(date).toHaveProperty('isTomorrow', isTomorrow);
        expect(date).toHaveProperty('isValid', isValid);
        expect(date).toHaveProperty('isYesterday', isYesterday);
        expect(date).toHaveProperty('startOf', startOf);
        expect(date).toHaveProperty('today', today);
        expect(date).toHaveProperty('tomorrow', tomorrow);
        expect(date).toHaveProperty('yesterday', yesterday);
    });
});
