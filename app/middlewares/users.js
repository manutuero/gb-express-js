const { check, validationResult } = require('express-validator');
exports.checks = [
  check('email').isEmail(),
  check('firstName').isLength({ min: 3 }),
  check('lastName').isLength({ min: 3 }),
  check('password').isLength({ min: 5 })
];
exports.validateChecks = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
};
