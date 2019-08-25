const express = require('express');

const albumsController = express.Router();
const albums = require('../services/albums');

albumsController.get('/', albums.getAlbums);
albumsController.get('/:id/photos', albums.getIdAlbumPhotos);
module.exports = albumsController;
