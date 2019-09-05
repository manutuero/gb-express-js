const { check, validationResult } = require('express-validator');
const db = require('../models');
exports.checks = [
  check('email')
    .isEmail()
    .custom(email => email.includes('@wolox'))
    .withMessage('Email must be wolox domain')
    .custom(async email => {
      const user = await db.user.findOne({ where: { email } });
      if (user) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('E-mail already in use');
      }
      return true;
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
};
