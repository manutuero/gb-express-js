// const fetch = require('node-fetch');
// const logger = require('../../app/logger');
const errors = require('../errors');
const rp = require('request-promise');

exports.getAlbums = () =>
  rp(`${process.env.ALBUMS_URL}albums`).catch(err => {
    throw errors.external_api_error(err.message);
  });
// fetch(`${process.env.ALBUMS_URL}albums`).then(response => response.json());

// exports.getIdAlbumPhotos = id =>
//   fetch(`${process.env.ALBUMS_URL}photos`)
//     .then(response => response.json())
//     .then(jsonResponse => filterResponseById(jsonResponse, id))
//     .catch(err => {
//       throw new errors.handle(EXTERNAL_API_ERROR);
//     });

exports.getIdAlbumPhotos = id =>
  rp({
    uri: `${process.env.ALBUMS_URL}photos`,
    qs: {
      albumId: id
    },
    method: 'GET'
  }).catch(err => {
    throw errors.external_api_error(err.message);
  });
