const { serializeCreatedUser } = require('../serializers/users');
const { mapUserCreateRequest } = require('../mappers/user');
const logger = require('../../app/logger');
const userDb = require('../services/database/users');
const errors = require('../errors');

exports.createUser = (req, res, next) => {
  const newUserData = mapUserCreateRequest(req.body);

  return userDb
    .findUserByEmail(newUserData)
    .then(user => {
      if (user) {
        throw errors.emailRegisteredError();
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
