const { paramsValidationsErrors } = require('../constants/errorsMessages');
const constants = require('../constants');
const config = require('../../config');

exports.signUp = {
  email: {
    in: ['body'],
    isEmail: true,
    exists: true,
    errorMessage: paramsValidationsErrors.invalidEmail,
    custom: {
      options: email => email.includes(config.common.emailDomain),
      errorMessage: paramsValidationsErrors.invalidDomain
    }
  },
  first_name: {
    in: ['body'],
    exists: true,
    isLength: {
      options: { min: constants.MIN_FIRST_NAME_LENGTH, max: constants.MAX_FIRST_NAME_LENGTH },
      errorMessage: paramsValidationsErrors.firstNameLengthError
    }
  },
  last_name: {
    in: ['body'],
    exists: true,
    isLength: {
      options: { min: constants.MIN_LAST_NAME_LENGTH, max: constants.MAX_LAST_NAME_LENGTH },
      errorMessage: paramsValidationsErrors.lastNameLengthError
    }
  },
  password: {
    in: ['body'],
    exists: true,
    isLength: {
      options: { max: constants.MAX_PASSWORD_LENGTH, min: constants.MIN_PASSWORD_LENGTH },
      errorMessage: paramsValidationsErrors.passwordLengthError
    },
    isAlphanumeric: true,
    errorMessage: paramsValidationsErrors.passwordIsNotAlphanumeric
  }
};
