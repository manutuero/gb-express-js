const app = require('../server');
const db = require('../app/models');

const supertest = require('supertest');

const request = supertest(app);
describe('Post /users', () => {
  it('Create user', async done => {
    const response = await request
      .post('/users')
      .set('Content-Type', 'application/json')
      .set('Acccept', 'application/json')
      .send({
        firstName: 'TestName',
        lastName: 'TestLastName',
        password: '12345678Ab',
        email: 'Test@wolox.com'
      });
    expect(response.status).toBe(201);
    expect(response.body).not.toBe({});
    expect(response.body.firstName).toBe('TestName');
    expect(response.body.lastName).toBe('TestLastName');
    expect(response.body.email).toBe('Test@wolox.com');
    // expect(response.body.id).toBe();
    done();
  });

  it('Fails to create user, missing field', async done => {
    const response = await request
      .post('/users')
      .set('Content-Type', 'application/json')
      .set('Acccept', 'application/json')
      .send({
        firstName: 'TestName',
        password: 'TestPassword',
        email: 'Test@wolox.com'
      });
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
      .send({
        firstName: 'TestName',
        lastName: 'TestLastName',
        password: '1234567',
        email: 'Test@wolox.com'
      });
    expect(response.status).toBe(422);
    expect(response.body.errors[0]).toMatchObject({
      param: 'password',
      msg: 'Password must be 8 characters long',
      location: 'body'
    });
    done();
  });

  it('Fails to create user, user already exists', async done => {
    await db.user.create({
      firstName: 'TestName',
      lastName: 'TestLastName',
      password: '1234567',
      email: 'Test@wolox.com'
    });
    const response = await request
      .post('/users')
      .set('Content-Type', 'application/json')
      .set('Acccept', 'application/json')
      .send({
        firstName: 'TestName',
        lastName: 'TestLastName',
        password: '12345678',
        email: 'Test@wolox.com'
      });
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
