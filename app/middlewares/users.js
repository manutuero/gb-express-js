const userService = require('../services/database/users');
const errors = require('../errors');
const { paramsValidationsErrors } = require('../constants/errorsMessages');

exports.newUserEmailCheck = async (req, res, next) => {
  const userExistence = await userService.userEmailExists(req.body.email);
  if (userExistence) {
    return next(errors.field_validations_failed(paramsValidationsErrors.emailAlreadyExists));
  }
  // serializer
  req.params.user = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  };
  return next();
};
