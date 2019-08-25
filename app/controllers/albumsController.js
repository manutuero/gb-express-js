const express = require('express');

// eslint-disable-next-line new-cap
const albumsController = express.Router();
const albums = require('../services/albums');

albumsController.get('/', albums.getAlbums);
albumsController.get('/:id/photos', albums.getIdAlbumPhotos);
module.exports = albumsController;
