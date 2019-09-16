const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');

exports.hashPassword = password => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
