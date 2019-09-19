const db = require('../../models');
const errors = require('../../errors');
exports.findUserByEmail = newUser => {
  try {
    return db.user.findOne({ where: { email: newUser.email } });
  } catch {
    throw errors.databaseError;
  }
};

exports.createUser = userToCreate => {
  try {
    return db.user.create(userToCreate);
  } catch {
    throw errors.databaseError;
  }
};
