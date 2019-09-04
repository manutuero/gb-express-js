'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        field: 'first_name'
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        field: 'last_name'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        len: [[1, 30]]
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        notEmpty: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
};
