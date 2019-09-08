const app = require('../server');
const supertest = require('supertest');

const request = supertest(app);

it('Create user', async done => {
  const response = await request
    .post('/users')
    .set('Content-Type', 'application/json')
    .set('Acccept', 'application/json')
    .send({
      firstName: 'gabito',
      lastName: 'bori',
      password: 'dgkfkfkfkfk',
      email: 'dollkjhgfdo@wolox.com'
    });
  // expect(response.status).toBe(200);
  expect(response.body).not.toBe({});
  expect(response.body.firstName).toBe('gabito');
  expect(response.body.lastName).toBe('bori');
  expect(response.body.email).toBe('dollkjhgfdo@wolox.com');
  // expect(response.body.id).toBe();

  done();
});

// it('gets the albums wrong', async done => {
//   const response = await request.get('/albums');

//   done();
// });
