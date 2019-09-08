// factory girl
// para pegarle a las requests npm install supertest --save-dev js
const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

it('gets the albums', async done => {
  const response = await request.get('/albums');

  expect(response.status).toBe(200);
  expect(response.body).not.toBe({});

  done();
});

it('gets the albums wrong', async done => {
  process.env.ALBUMS_URL = 'https://jsonplaceholder.typicoe.com/';
  const response = await request.get('/albums');

  expect(response.status).toBe(500);
  expect(response.body.message).toBe('Error: getaddrinfo ENOTFOUND jsonplaceholder.typicoe.com');
  expect(response.body.internal_code).toBe('external_api_error');
  process.env.ALBUMS_URL = 'https://jsonplaceholder.typicode.com/';
  done();
});
