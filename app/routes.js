// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const albumsController = require('./controllers/albumsController');

exports.init = app => {
  app.get('/health', healthCheck);
  app.use('/albums', albumsController);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
