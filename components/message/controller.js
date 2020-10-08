const store = require('./store');
const socket = require('../../socket').socket;
const config = require('../../config');

function getMessages(filterChat) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterChat));
  });
}

function addMessage(chat, user, message, file) {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      console.error('[messageController] No hay chat o usuario o mensaje');
      return reject(new Error('Los datos son incorrectos'));
    }

    let fileUrl = '';
    if (file) {
      // fileUrl = 'http://localhost:3000/app/files/' + file.filename;
      fileUrl = config.host + ':' + config.port + config.publicRoute + '/files/' + file.filename;
    }

    const fullMessage = {
      chat: chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl,
    };
    store.add(fullMessage);

    socket.io.emit('message', fullMessage);

    resolve(fullMessage);
  });
}

function updateMessage(id, message) {
  return new Promise((resolve, reject) => {
    if (!id || !message) {
      return reject(new Error('Los datos son incorrectos'));
    }
    const result = store.update(id, message);
    resolve(result);
  });
}

function deleteMessages(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject(new Error('Los datos son incorrectos'));
    }
    resolve(store.delete(id));
  });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessages,
};
