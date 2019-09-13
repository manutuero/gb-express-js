const constants = require('../constants');
module.exports = {
  paramsValidations: {
    validEmail: 'Email must ve valid.',
    validWoloxEmail: 'Email must be wolox domain.',
    passwordLength: 'Password must be 8 characters long at least.',
    passwordAlphanumeric: 'Password must be alphanumeric.',
    firstNameLength: `Field name must be ${constants.maxFirstNameLength} characters long.`,
    lastNameLength: `Field name must be ${constants.maxLastNameLength} characters long.`,
    emailAlreadyExists: 'Email already registered.'
  },
  responseErrors: {}
};
