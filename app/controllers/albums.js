const albums = require('../services/albums');

exports.getAlbums = (_, res) => {
  albums.getAlbums().then(json => res.status(200).send(json));
};
exports.getPhotosByAlbumId = (req, res) => {
  albums.getIdAlbumPhotos(req.params.id).then(response => {
    if (parseInt(response.length)) {
      return res.status(200).send(response);
    }
    return res.status(404).send();
  });
};
