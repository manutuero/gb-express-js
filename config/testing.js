exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },
    saltRouds: 10,
    emailDomain: '@wolox.',

    session: {
      secret: 'some-super-secret'
    }
  }
};
