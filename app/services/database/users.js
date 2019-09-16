const db = require('../../models');

exports.userNotExists = newUser => db.user.findOne({ where: { email: newUser.email } });

exports.createUser = userToCreate => db.user.create(userToCreate);
