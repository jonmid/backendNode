const db = require('mongoose');

async function connect(url) {
  await db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('[db] Conectada con exito');
}

module.exports = connect;
