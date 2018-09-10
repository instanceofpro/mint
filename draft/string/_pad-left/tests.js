import { VOID_0 } from '../../internal/constants';
import padLeft from '.';

describe('string/padLeft()', () => {
    test('adds characters to the left', () => {
        expect(padLeft('lorem', 4, '^')).toBe('lorem');
        expect(padLeft('lorem', 5, '^')).toBe('lorem');
        expect(padLeft('lorem', 6, '^')).toBe('^lorem');
        expect(padLeft('lorem', 7, '^')).toBe('^^lorem');
        expect(padLeft('lorem', 8, '^')).toBe('^^^lorem');
    });

    test('takes only first character of padding string', () => {
        expect(padLeft('lorem', 6, '#')).toBe('#lorem');
        expect(padLeft('lorem', 6, '%#')).toBe('%lorem');
        expect(padLeft('lorem', 6, '&%#')).toBe('&lorem');
        expect(padLeft('lorem', 6, '$&%#')).toBe('$lorem');
    });

    test('works with null and undefined', () => {
        expect(padLeft(VOID_0, 5, '*')).toBe('undefined');
        expect(padLeft(null, 5, '*')).toBe('*null');
    });
});