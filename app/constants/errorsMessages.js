const constants = require('../constants');
module.exports = {
  paramsValidationsErrors: {
    invalidEmail: 'Email must ve valid.',
    invalidDomain: 'Invalid domain.',
    passwordLengthError: 'Password length error.',
    passwordIsNotAlphanumeric: 'Password must be alphanumeric.',
    // eslint-disable-next-line max-len
    firstNameLengthError: `Field first_name must be at least ${constants.MIN_LAST_NAME_LENGTH} characters long and less than ${constants.MAX_FIRST_NAME_LENGTH}.`,
    // eslint-disable-next-line max-len
    lastNameLengthError: `Field last_name must be at least ${constants.MIN_LAST_NAME_LENGTH} characters long and less than ${constants.MAX_LAST_NAME_LENGTH}.`,
    emailAlreadyExists: { message: 'Email already registered.', param: 'email' }
  },
  responseErrors: {}
};
