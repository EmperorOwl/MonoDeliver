/**
 * Handles the generation of random numbers and characters.
 * @module utilsRandom
 */

/**
 * Returns a string of random digits.
 * @param {integer} count - the number of digits
 * @returns {string}
 */
const getRandDigit = (count = 1) => {
    let res = "";
    while (res.length < count) {
        res += getRandInt(0, 9);
    }
    return res;
};

/**
 * Returns a string of random uppercase letters.
 * @param {integer} count - the number of characters
 * @returns {string}
 */
const getRandChar = (count = 1) => {
    let res = "";
    while (res.length < count) {
        res += String.fromCharCode(getRandInt(65, 90));
    }
    return res;
};

/**
 * Returns a random integer in the range min (inclusive) to max (inclusive).
 * @param {integer} min - the minimum number
 * @param {integer} max - the maximum number
 * @returns {integer}
 */
const getRandInt = (min, max) => {
    return Math.floor(min + Math.random() * (max - min + 1));
};

module.exports = {
    getRandDigit,
    getRandChar,
};
