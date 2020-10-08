const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.get('/:userId', (req, res) => {
  controller
    .list(req.params.userId)
    .then((data) => {
      response.success(req, res, data);
    })
    .catch((e) => {
      response.error(req, res, 'Información invalida', 500, e);
    });
});
router.post('/', (req, res) => {
  // http://localhost:3000/chat
  controller
    .add(req.body.users)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((e) => {
      response.error(req, res, 'Información invalida', 500, e);
    });
});

module.exports = router;
