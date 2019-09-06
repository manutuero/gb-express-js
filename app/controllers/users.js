const bcrypt = require('bcrypt');

const logger = require('../../app/logger');
const db = require('../models');
const errors = require('../errors');

const saltRounds = 10;
exports.createUser = (req, res, next) => {
  const newUserData = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(newUserData.password, salt);
  newUserData.password = hash;

  Promise.resolve(db.user.create(newUserData))
    .then(createdUser => {
      logger.info(`User ${createdUser.dataValues.firstName} was created.`);
      const data = {
        id: createdUser.dataValues.id,
        firstName: createdUser.dataValues.firstName,
        lastName: createdUser.dataValues.lastName,
        email: createdUser.dataValues.email
      };
      res.status(201).send(data);
    })
    .catch(err => {
      logger.error('Error inserting user in database');
      next(errors.databaseError(err.message));
    });
};
