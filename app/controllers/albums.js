const request = require('request');
const logger = require('../logger');

exports.getAlbums = (_, res1) => {
  request('https://jsonplaceholder.typicode.com/albums', { json: true }, (err, res, body) => {
    if (res.statusCode === 404) {
      return res1.status(404).send(body.explanation);
    }
    logger.info(body.info);
    logger.info(body.explanation);
    return res1.status(res.statusCode).send(body);
  });
};

exports.getIdAlbumPhotos = (req,res,next) => {

return res.send();
} ;

