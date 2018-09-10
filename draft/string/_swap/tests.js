import swap from '.';

describe('string/_swap()', () => {
    test('swaps case of characters', () => {
        expect(swap('lorem ipsum')).toBe('LOREM IPSUM');
        expect(swap('lOREM iPSUM')).toBe('Lorem Ipsum');
        expect(swap('')).toBe('');
    });
});