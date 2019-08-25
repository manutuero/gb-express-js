const request = require('request');
const logger = require('../logger');
const url = 'https://jsonplaceholder.typicode.com/';

exports.getAlbums = (_, res1) => {
  request(`${url}albums`, { json: true }, (err, res, body) => {
    if (res.statusCode === 404) {
      return res1.status(404).send(body.explanation);
    }
    logger.info(body.explanation);
    return res1.status(res.statusCode).send(body);
  });
};
exports.getIdAlbumPhotos = (req, res1) => {
  request(`${url}photos`, { json: true }, (err, res, body) => {
    if (res.statusCode === 404) {
      return res1.status(404).send(body.explanation);
    }
    // logger.info(body);
    logger.info(`Query id: ${req.params.id}`);
    const filteredAlbums = body.filter(album => parseInt(album.albumId) === parseInt(req.params.id));
    logger.info(`Amount of filtered photos: ${Object.keys(filteredAlbums).length}`);
    return res1.status(res.statusCode).send(filteredAlbums);
  });
};
