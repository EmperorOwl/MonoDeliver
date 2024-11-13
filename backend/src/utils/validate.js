/**
 * Handles validation of inputs.
 * @module utilsValidate
 */

/**
 * Checks whether a string is of correct length.
 * @param {string} what - the name of the input being checked
 * @param {integer} min - the minimum number of characters
 * @param {integer} max - the maximum number of characters
 * @returns {Object} containing the validator function and error message
 */
const checkLength = (what, min, max) => {
    let message = `${what} must be `;
    if (min === max) {
        message += `exactly ${min}`;
    } else {
        message += `between ${min} and ${max}`;
    }
    message += " characters long";
    return {
        validator: (string) => string.length >= min && string.length <= max,
        message: message,
    };
};

/**
 * Checks whether a string is an allowed choice.
 * @param {string} what - the name of the input being checked
 * @param {Object} choices - the list of allowed choices
 * @returns {Object} containing the validator function and error message
 */
const checkChoice = (what, choices) => {
    return {
        validator: (string) => choices.includes(string),
        message: `${what} must be in [${choices.join(", ")}]`,
    };
};

/**
 * Checks whether a string contains only letters.
 * @param {string} what - the name of the input being checked
 * @returns {Object} containing the validator function and error message
 */
const checkAlphabetic = (what) => {
    return {
        validator: (string) => /^[A-Za-z]+$/.test(string),
        message: `${what} must contain only letters`,
    };
};

/**
 * Checks whether a string contains only letters and/or numbers.
 * @param {string} what - the name of the input being checked
 * @returns {Object} containing the validator function and error message
 */
const checkAlphanumeric = (what) => {
    return {
        validator: (string) => /^[A-Za-z0-9]+$/.test(string),
        message: `${what} must not contain any symbols`,
    };
};

module.exports = {
    checkLength,
    checkChoice,
    checkAlphabetic,
    checkAlphanumeric,
};
