const { check, validationResult } = require('express-validator');

const db = require('../models');
const logger = require('../logger');
const errors = require('../errors');
exports.checks = [
  check('email')
    .isEmail()
    .custom(email => email.includes('@wolox'))
    .withMessage('Email must be wolox domain')
    .custom(async email => {
       const user = await db.user.findOne({ where: { email } }) ;
      if (user) {
        throw errors.databaseError('User already exists.');
      }
    }),
  check('firstName').isLength({ min: 3 }),
  check('lastName').isLength({ min: 3 }),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be 8 characters long')
    .isAlphanumeric()
    .withMessage('Password must be alphanumeric')
];

exports.validateChecks = (req, res, next) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    logger.error('User was not created. At least one field validation failed.');
    return res.status(422).json({ errors: errs.array() });
  }
  return next();
};
