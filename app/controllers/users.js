const { hashPassword } = require('../helpers');

const logger = require('../../app/logger');
const db = require('../models');
const errors = require('../errors');

exports.createUser = (req, res, next) => {
  const newUserData = req.params.user;

  newUserData.password = hashPassword(newUserData.password);

  return db.user
    .create(newUserData)
    .then(createdUser => {
      logger.info(`User ${createdUser.dataValues.firstName} was created.`);
      const data = {
        user: {
          id: createdUser.dataValues.id,
          first_name: createdUser.dataValues.firstName,
          last_name: createdUser.dataValues.lastName,
          email: createdUser.dataValues.email
        }
      };
      return res.status(201).send(data);
    })
    .catch(err => {
      logger.error('Error inserting user in database');
      return next(errors.databaseError(err.message));
    });
};
