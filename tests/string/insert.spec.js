'use strict';

import chai from 'chai';
import insert from '../../src/string/insert';

const expect = chai.expect;

describe('string/insert()', () => {
    it('Should insert a substring in a string', () => {
        expect(insert(', World!', 'Hello', 0)).to.equal('Hello, World!');
        expect(insert(', World!', 'Hello', null)).to.equal('Hello, World!');
        expect(insert('Hello, ', 'World!', 10)).to.equal('Hello, World!');
        expect(insert('Hello, Worl', 'd!', 12)).to.equal('Hello, World!');
        expect(insert('Hello, Worl', 'd!', '12')).to.equal('Hello, World!');
    });

    it('Should treat undefined index as zero', () => {
        expect(insert(', World!', 'Hello')).to.equal('Hello, World!');
        expect(insert(', World!', 'Hello', void 0)).to.equal('Hello, World!');
    });

    it('Should accept negative indexes', () => {
        expect(insert('Hello, Worl!', 'd', -1)).to.equal('Hello, World!');
        expect(insert('o, World!', 'Hell', -10)).to.equal('Hello, World!');
        expect(insert('o, World!', 'Hell', '-10')).to.equal('Hello, World!');
    });

    it('Should accept indexes large than the length of a string', () => {
        expect(insert('Hello, ', 'World!', 100)).to.equal('Hello, World!');
    });
});