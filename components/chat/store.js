const Model = require('./model');

async function getChats(userId) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (userId) {
      filter = { users: userId };
    }
    const chats = Model.find(filter)
      .populate('users')
      .catch((e) => {
        reject(e);
      });
    resolve(chats);
  });
}

async function addChat(chat) {
  const myChat = new Model(chat);
  await myChat.save();
}

module.exports = {
  add: addChat,
  list: getChats,
};
