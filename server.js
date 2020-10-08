const express = require('express');
const app = express();
const server = require('http').Server(app);
const socket = require('./socket');
const cors = require('cors');
const config = require('./config');

const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./network/routes');

db(config.dbUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(config.publicRoute, express.static('public'));
app.use(cors());

socket.connect(server);
routes(app);

server.listen(config.port, () => {
  console.log(`Example app listening at ${config.host}:${config.port}`);
});
