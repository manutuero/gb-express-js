const db = require('../models');
exports.createUser = (req, res) => {
  Promise.resolve(db.user.create(req.body))
    .then(createdUser => res.send(createdUser.dataValues))
    .catch(err => res.send(err.message));
};
