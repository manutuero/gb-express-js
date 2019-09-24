const errors = require('../errors');
const rp = require('request-promise');

exports.getAlbums = () =>
  rp(`${process.env.ALBUMS_URL}albums`).catch(err => {
    throw errors.externalApiError(err.message);
  });

exports.getIdAlbumPhotos = id =>
  rp({
    uri: `${process.env.ALBUMS_URL}photos`,
    qs: {
      albumId: id
    },
    method: 'GET'
  }).catch(err => {
    throw errors.externalApiError(err.message);
  });
