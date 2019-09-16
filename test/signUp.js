const app = require('../server');
const db = require('../app/models');
const supertest = require('supertest');
const errors = require('../app/errors');
const { paramsValidationsErrors } = require('../app/constants/errorsMessages');

const validUser = {
  first_name: 'TestName',
  last_name: 'TestLastName',
  password: '12345678Ab',
  email: 'Test@wolox.com'
};
const request = supertest(app);

describe('Post /users', () => {
  it('Create user', async done => {
    const response = await request
      .post('/users')
      .set('Content-Type', 'application/json')
      .set('Acccept', 'application/json')
      .send(validUser);
    expect(response.status).toBe(201);
    expect(response.body).not.toBe({});
    expect(response.body.user.first_name).toBe(validUser.first_name);
    expect(response.body.user.last_name).toBe(validUser.last_name);
    expect(response.body.user.email).toBe(validUser.email);
    done();
  });

  it('Fails to create user, missing field', async done => {
    const { ...invalidUser } = validUser;
    delete invalidUser.last_name;
    const response = await request
      .post('/users')
      .set('Content-Type', 'application/json')
      .set('Acccept', 'application/json')
      .send(invalidUser);
    expect(response.status).toBe(400);
    expect(response.body.message.length).toBe(1);
    expect(response.body.message[0]).toBe('Invalid value');
    expect(response.body.internal_code).toBe(errors.VALIDATION_ERROR);
    done();
  });

  it('Fails to create user, short pasasword', async done => {
    const response = await request
      .post('/users')
      .set('Content-Type', 'application/json')
      .set('Acccept', 'application/json')
      .send({ ...validUser, password: '1234567' });
    expect(response.status).toBe(400);
    expect(response.body.message.length).toBe(1);
    expect(response.body.message[0]).toBe(paramsValidationsErrors.passwordLengthError);
    expect(response.body.internal_code).toBe(errors.VALIDATION_ERROR);
    done();
  });

  it('Fails to create user, user already exists', async done => {
    await db.user.create(validUser);
    const response = await request
      .post('/users')
      .set('Content-Type', 'application/json')
      .set('Acccept', 'application/json')
      .send(validUser);
    expect(response.status).toBe(400);
    done();
  });
});
