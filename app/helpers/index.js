const bcrypt = require('bcrypt');
const config = require('../../config');
exports.hashPassword = password => {
  const hash = bcrypt.hashSync(password, parseInt(config.common.saltRounds));
  return hash;
};
