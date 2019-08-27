const fetch = require('node-fetch');
const url = 'https://jsonplaceholder.typicode.com/';
const logger = require('../../app/logger');
exports.getAlbums = () => fetch(`${url}albums`).then(response => response.json());

const filerResponseById = (list, id) => list.filter(album => parseInt(album.albumId) === parseInt(id));

exports.getIdAlbumPhotos = id =>
  fetch(`${url}photos`)
    .then(response => response.json())
    .then(jsonResponse => filerResponseById(jsonResponse, id))
    .catch(logger.error);
