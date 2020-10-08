const store = require('./store');

function getChats(userId) {
  return new Promise((resolve, reject) => {
    resolve(store.list(userId));
  });
}

function addChat(users) {
  return new Promise((resolve, reject) => {
    if (!users || !Array.isArray(users)) {
      console.error('[chatController] No hay lista de usuarios');
      return reject(new Error('Los datos son incorrectos'));
    }
    const fullChat = {
      users: users,
    };
    store.add(fullChat);
    resolve(fullChat);
  });
}

module.exports = {
  add: addChat,
  list: getChats,
};
