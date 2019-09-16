const db = require('../../models');

exports.userEmailExists = async email => {
  const user = await db.user.findOne({ where: { email } });
  return !!user;
};

exports.createUser = userToCreate => db.user.create(userToCreate);
