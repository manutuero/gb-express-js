/* eslint-disable max-len */
const constants = require('../constants');
module.exports = {
  paramsValidationsErrors: {
    invalidEmail: 'Invalid Email.',
    invalidDomain: 'Invalid domain.',
    passwordLengthError: 'Password length error.',
    passwordIsNotAlphanumeric: 'Password must be alphanumeric.',
    firstNameLengthError: `Field first_name must be at least ${constants.MIN_LAST_NAME_LENGTH} characters long and less than ${constants.MAX_FIRST_NAME_LENGTH}.`,
    lastNameLengthError: `Field last_name must be at least ${constants.MIN_LAST_NAME_LENGTH} characters long and less than ${constants.MAX_LAST_NAME_LENGTH}.`
  }
};
