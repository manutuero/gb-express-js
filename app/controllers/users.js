const logger = require('../../app/logger');
const db = require('../models');
const errors = require('../errors');
const bcrypt = require('bcrypt');
exports.createUser = (req, res, next) => {
  const query = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(query.password, salt);
  query.password = hash;

  Promise.resolve(db.user.create(query))
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
