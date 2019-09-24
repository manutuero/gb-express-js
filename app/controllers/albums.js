const albums = require('../services/albums');
const logger = require('../../app/logger');
const errors = require('../errors');
exports.getAlbums = (_, res, next) =>
  albums
    .getAlbums()
    .then(json => {
      logger.info('Albums were fetched from external api');
      res.status(200).send(JSON.parse(json));
    })
    .catch(err => {
      logger.error('There was an error retrieving albums from external api');
      return next(err);
    });

exports.getPhotosByAlbumId = (req, res, next) => {
  albums
    .getIdAlbumPhotos(req.params.id)
    .then(response => {
      const albumsById = JSON.parse(response);
      if (albumsById && albumsById.length) {
        logger.info(`Get albums Id returned : ${albumsById.length} objects`);

        return res.status(200).send(albumsById);
      }
      logger.error('Get albums Id returned empty');
      throw errors.notFoundError(`No album found with id: ${req.params.id}`);
    })
    .catch(err => {
      logger.error('There was an error retrieving photos from external api');
      return next(err);
    });
};
