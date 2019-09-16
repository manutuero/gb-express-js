exports.serializeCreatedUser = createdUser => {
  const serializedUser = {
    user: {
      id: createdUser.dataValues.id,
      first_name: createdUser.dataValues.firstName,
      last_name: createdUser.dataValues.lastName,
      email: createdUser.dataValues.email
    }
  };
  return serializedUser;
};

exports.serializeErrorSignUp = error => ({
  message: error.msg,
  param: error.param
});
