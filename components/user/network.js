const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.get('/', (req, res) => {
  const filterUser = req.query.user || null;
  controller
    .list(filterUser)
    .then((data) => {
      response.success(req, res, data);
    })
    .catch((e) => {
      response.error(req, res, 'Información invalida', 500, e);
    });
});
router.post('/', (req, res) => {
  // http://localhost:3000/user?error=ok
  controller
    .add(req.body.name)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((e) => {
      response.error(req, res, 'Información invalida', 400, e);
    });
});
router.patch('/:id', (req, res) => {
  // http://localhost:3000/user/32432453453
  controller
    .update(req.params.id, req.body.name)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((e) => {
      response.error(req, res, 'Información invalida', 500, e);
    });
});
router.delete('/:id', (req, res) => {
  controller
    .delete(req.params.id)
    .then((data) => {
      response.success(req, res, `Usuario con id: ${req.params.id} fue eliminado correctamente`, 200);
    })
    .catch((e) => {
      response.error(req, res, 'Información invalida', 500, e);
    });
});

module.exports = router;
