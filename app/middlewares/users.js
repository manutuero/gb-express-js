const { check, validationResult } = require('express-validator');

const db = require('../models');
const logger = require('../logger');
const errors = require('../errors');
const paramErrors = require('../constants/errorsMessages').paramsValidations;
const constants = require('../constants');
exports.checks = [
  check('email')
    .isEmail()
    .withMessage(paramErrors.validEmail)
    .custom(email => email.includes(constants.emailDomian))
    .withMessage(paramErrors.validWoloxEmail)
    .custom(async email => {
      const user = await db.user.findOne({ where: { email } });
      if (user) {
        throw errors.databaseError(paramErrors.emailAlreadyExists);
      }
    }),
  check('firstName')
    .isLength({ min: constants.maxFirstNameLength })
    .withMessage(paramErrors.firstNameLength),
  check('lastName')
    .isLength({ min: constants.maxLastNameLength })
    .withMessage(paramErrors.lastNameLength),
  check('password')
    .isLength({ min: constants.maxPasswordLength })
    .withMessage(paramErrors.passwordLength)
    .isAlphanumeric()
    .withMessage(paramErrors.passwordAlphanumeric)
];

exports.validateChecks = (req, res, next) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    logger.error('User was not created. At least one field validation failed.');
    // return res.status(422).json({ errors: errs.array() });
    return next(errors.fied_validations_failed(errs));
  }
  return next();
};
