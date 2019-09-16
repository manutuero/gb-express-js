exports.mapUserCreateRequest = userToMap => {
  const userToCreate = {
    firstName: userToMap.first_name,
    lastName: userToMap.last_name,
    email: userToMap.email,
    password: userToMap.password
  };
  return userToCreate;
};
