import int from './int';
import isArray from '../is/isArray';

/**
 *
 * @param {Array} list The list to choice.
 * @returns {*} Returns the pseudo-random element.
 *
 * @example
 *
 * let list = [1, 2, 3];
 * choice(list);
 * // => 2
 *
 * choice('lorem', 'ipsum', 'sit');
 * // => 'sit'
 */
function choice(list) {
    let args = (arguments.length === 1 && isArray(list)) ? list : arguments;

    return args[int(0, args.length - 1)];
}

export default choice;
