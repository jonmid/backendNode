const store = require('./store');

function getUsers(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
}

function addUser(name) {
  return new Promise((resolve, reject) => {
    if (!name) {
      console.error('[userController] No hay nombre de usuario');
      return reject(new Error('Los datos son incorrectos'));
    }
    const fullUser = {
      name: name.toUpperCase(),
    };
    store.add(fullUser);
    resolve(fullUser);
  });
}

function updateUser(id, user) {
  return new Promise((resolve, reject) => {
    if (!id || !user) {
      return reject(new Error('Los datos son incorrectos'));
    }
    const result = store.update(id, user.toUpperCase());
    resolve(result);
  });
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject(new Error('Los datos son incorrectos'));
    }
    resolve(store.delete(id));
  });
}

module.exports = {
  add: addUser,
  list: getUsers,
  update: updateUser,
  delete: deleteUser,
};
