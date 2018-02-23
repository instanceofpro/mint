import { HEX_LETTERS, DIGITS } from '../../internal/constants';
import int from '../int';

/**
 * @param {number} length The length of generated number.
 * @return {string} Return the string of hexadecimal number.
 */
export default function (length) {
    let result = '';
    const letters = (HEX_LETTERS + DIGITS).split('');
    const size = letters.length;

    length = length && length > 0 ? length : 1;

    while (length--) {
        result += letters[int(0, size - 1)];
    }

    return result;
}
