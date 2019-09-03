const albums = require('../services/albums');
const logger = require('../../app/logger');
exports.getAlbums = (_, res, next) =>
  albums
    .getAlbums()
    .then(json => {
      logger.info(JSON.stringify(json));
      return res.status(200).send(json);
    })
    .catch(err => {
      logger.error(err.message);
      return next();
    });
exports.getPhotosByAlbumId = (req, res) => {
  albums.getIdAlbumPhotos(req.params.id).then(response => {
    if (parseInt(response.length)) {
      return res.status(200).send(response);
    }
    return res.status(404).send();
  });
};
