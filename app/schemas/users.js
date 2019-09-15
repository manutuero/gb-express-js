const { paramsValidationsErrors } = require('../constants/errorsMessages');
const constants = require('../constants');

exports.signUp = {
  email: {
    in: ['body'],
    isEmail: true,
    exists: true,
    errorMessage: paramsValidationsErrors.invalidEmail,
    custom: {
      options: email => email.includes(constants.emailDomian),
      errorMessage: paramsValidationsErrors.invalidDomain
    }
  },
  first_name: {
    in: ['body'],
    exists: true,
    isLength: {
      options: { min: constants.minFirstNameLength, max: constants.maxFirstNameLength },
      errorMessage: paramsValidationsErrors.firstNameLengthError
    }
  },
  last_name: {
    in: ['body'],
    exists: true,
    isLength: {
      options: { min: constants.minLastNameLength, max: constants.maxLastNameLength },
      errorMessage: paramsValidationsErrors.lastNameLengthError
    }
  },
  password: {
    in: ['body'],
    exists: true,
    isLength: {
      options: { max: 50, min: 8 },
      errorMessage: paramsValidationsErrors.passwordLengthError
    },
    isAlphanumeric: true,
    errorMessage: paramsValidationsErrors.passwordIsNotAlphanumeric
  }
};
