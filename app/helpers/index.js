const bcrypt = require('bcrypt');

exports.hashPassword = password => {
  const hash = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
  return hash;
};
