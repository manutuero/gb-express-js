const logger = require('../../app/logger');
exports.checkCreateUserData = fields =>
  new Promise((resolve, reject) => {
    console.log(fields.firstName);
    if (fields.firstName) {
      resolve(fields);
    }
    logger.error('Invalid params');
    reject(fields);
  });
