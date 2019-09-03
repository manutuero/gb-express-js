const fetch = require('node-fetch');
const logger = require('../../app/logger');
exports.getAlbums = () => fetch(`${process.env.ALBUMS_URL}albums`).then(response => response.json());

const filerResponseById = (list, id) => list.filter(album => parseInt(album.albumId) === parseInt(id));

exports.getIdAlbumPhotos = id =>
  fetch(`${process.env.ALBUMS_URL}photos`)
    .then(response => response.json())
    .then(jsonResponse => filerResponseById(jsonResponse, id))
    .catch(logger.error);
