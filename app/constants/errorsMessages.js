const constants = require('../constants');
module.exports = {
  paramsValidationsErrors: {
    invalidEmail: 'Email must ve valid.',
    invalidDomain: 'Invalid domain.',
    passwordLengthError: 'Password length error.',
    passwordIsNotAlphanumeric: 'Password must be alphanumeric.',
    // eslint-disable-next-line max-len
    firstNameLengthError: `Field first_name must be at least ${constants.minLastNameLength} characters long and less than ${constants.maxFirstNameLength}.`,
    // eslint-disable-next-line max-len
    lastNameLengthError: `Field last_name must be at least ${constants.minLastNameLength} characters long and less than ${constants.maxFirstNameLength}.`,
    emailAlreadyExists: 'Email already registered.'
  },
  responseErrors: {}
};
