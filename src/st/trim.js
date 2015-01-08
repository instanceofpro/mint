var whitespaces = require('../internal/whitespaces.regex');
var string = require('../to/string');
var rest = require('../list/rest');

/**
 * Removes leading and trailing whitespaces or given characters from `target`.
 *
 * @param {String} target The string to trim.
 * @returns {String} The trimmed string.
 *
 * @example
 *
 * st.trim('   lorem   ');
 * // => 'lorem'
 *
 * st.trim('*+/lorem/+*', '/', '+*');
 * // => 'lorem'
 */
module.exports = function trim(target) {
    var chars = rest(arguments).join('');
    target = string(target);

    if (target.length === 0) {
        return '';
    }

    chars = chars.length ? chars : whitespaces;
    return target.replace(new RegExp('^[' + chars + ']+|[' + chars + ']+$', 'ig'), '');
};