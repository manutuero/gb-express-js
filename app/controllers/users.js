const { hashPassword } = require('../helpers');
const { serializeCreatedUser } = require('../serializers/users');
const logger = require('../../app/logger');
const userDb = require('../services/database/users');
const errors = require('../errors');

exports.createUser = (req, res, next) => {
  const newUserData = req.params.user;

  newUserData.password = hashPassword(newUserData.password);

  return userDb
    .createUser(newUserData)
    .then(createdUser => {
      logger.info(`User ${createdUser.dataValues.firstName} was created.`);
      const serializedUser = serializeCreatedUser(createdUser);
      return res.status(201).send(serializedUser);
    })
    .catch(err => {
      logger.error('Error inserting user in database');
      return next(errors.databaseError(err.message));
    });
};
