const { serializeCreatedUser } = require('../serializers/errors');
const { mapUserCreateRequest } = require('../mappers/user');
const logger = require('../../app/logger');
const userDb = require('../services/database/users');
const errors = require('../errors');
const { paramsValidationsErrors } = require('../constants/errorsMessages');

exports.createUser = (req, res, next) => {
  const newUserData = mapUserCreateRequest(req.body);

  return userDb
    .findUser(newUserData)
    .then(user => {
      if (user) {
        throw errors.field_validations_failed([paramsValidationsErrors.emailAlreadyExists]);
      }
      return userDb.createUser(newUserData);
    })
    .then(createdUser => {
      logger.info(`User ${createdUser.firstName} was created.`);
      const serializedUser = serializeCreatedUser(createdUser);
      return res.status(201).send(serializedUser);
    })
    .catch(next);
};
