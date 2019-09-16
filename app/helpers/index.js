const bcrypt = require('bcrypt');
const { saltRounds } = require('../constants');

exports.hashPassword = password => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
