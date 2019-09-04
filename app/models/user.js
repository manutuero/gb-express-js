'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  // user.associate = models => {
  // associations can be defined here
  // };
  return user;
};
