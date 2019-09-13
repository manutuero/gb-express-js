const app = require('../server');
const db = require('../app/models');

const supertest = require('supertest');

const validUser = {
  firstName: 'TestName',
  lastName: 'TestLastName',
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
    expect(response.body.firstName).toBe(validUser.firstName);
    expect(response.body.lastName).toBe(validUser.lastName);
    expect(response.body.email).toBe(validUser.email);
    done();
  });

  it('Fails to create user, missing field', async done => {
    const { ...invalidUser } = validUser;
    delete invalidUser.lastName;
    const response = await request
      .post('/users')
      .set('Content-Type', 'application/json')
      .set('Acccept', 'application/json')
      .send(invalidUser);
    expect(response.status).toBe(422);
    expect(response.body.errors[0]).toMatchObject({
      msg: 'Invalid value',
      param: 'lastName',
      location: 'body'
    });
    done();
  });

  it('Fails to create user, short pasasword', async done => {
    const response = await request
      .post('/users')
      .set('Content-Type', 'application/json')
      .set('Acccept', 'application/json')
      .send({ ...validUser, password: '1234567' });
    expect(response.status).toBe(422);
    expect(response.body.errors[0]).toMatchObject({
      param: 'password',
      msg: 'Password must be 8 characters long',
      location: 'body'
    });
    done();
  });

  it('Fails to create user, user already exists', async done => {
    await db.user.create(validUser);
    const response = await request
      .post('/users')
      .set('Content-Type', 'application/json')
      .set('Acccept', 'application/json')
      .send(validUser);
    expect(response.status).toBe(422);
    expect(response.body.errors[0]).toMatchObject({
      value: 'Test@wolox.com',
      msg: {
        message: 'User already exists.',
        internalCode: 'database_error'
      },
      param: 'email',
      location: 'body'
    });
    done();
  });
});
