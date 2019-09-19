const { serializeCreatedUser } = require('../serializers/users');
const { mapUserCreateRequest } = require('../mappers/user');
const logger = require('../../app/logger');
const userDb = require('../services/database/users');
const errors = require('../errors');
const { emailAlreadyExists } = require('../constants/errorsMessages');

exports.createUser = (req, res, next) => {
  const newUserData = mapUserCreateRequest(req.body);

  return userDb
    .findUserByEmail(newUserData)
    .then(user => {
      if (user) {
        throw errors.field_validations_failed([emailAlreadyExists]);
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
