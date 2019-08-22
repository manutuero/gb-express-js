const request = require('request');
const logger = require('../logger');
const url = 'https://jsonplaceholder.typicode.com/'

const makeRequest = (route,res1) => {
    request(url+route, { json: true }, (err, res, body) => {
        if (res.statusCode === 404) {
          return res1.status(404).send(body.explanation);
        }
        logger.info(body.info);
        logger.info(body.explanation);
        return res1.status(res.statusCode).send(body);
      });
}
exports.getAlbums = (_, res1) => {
    return makeRequest('albums',res1);
};

exports.getIdAlbumPhotos = (req,res,next) => {
return makeRequest('albums/'+req.query.id+'/photos',res);
} ;

