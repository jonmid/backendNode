const Model = require('./model');

async function getMessages(filterChat) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterChat !== null) {
      filter = { chat: filterChat };
    }
    const mesagges = Model.find(filter)
      .populate('user')
      .catch((e) => {
        reject(e);
      });
    resolve(mesagges);
  });
}

async function addMessage(message) {
  const myMessage = new Model(message);
  await myMessage.save();
}

async function updateMessage(id, message) {
  const mesaggeOld = await Model.findOne({ _id: id });
  mesaggeOld.message = message;
  const messageNew = await mesaggeOld.save();
  return messageNew;
}

async function deleteMessages(id) {
  const mesagges = await Model.deleteOne({ _id: id });
  return mesagges;
}

module.exports = {
  add: addMessage,
  list: getMessages,
  update: updateMessage,
  delete: deleteMessages,
};
