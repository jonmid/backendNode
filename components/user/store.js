const Model = require('./model');

async function getUsers(filterUser) {
  let filter = {};
  if (filterUser !== null) {
    filter = { user: filterUser.toUpperCase() };
  }
  const users = await Model.find(filter);
  return users;
}

async function addUser(user) {
  const myUser = new Model(user);
  await myUser.save();
}

async function updateUser(id, user) {
  const userOld = await Model.findOne({ _id: id });
  userOld.name = user;
  const userNew = await userOld.save();
  return userNew;
}

async function deleteUser(id) {
  const user = await Model.deleteOne({ _id: id });
  return user;
}

module.exports = {
  add: addUser,
  list: getUsers,
  update: updateUser,
  delete: deleteUser,
};
