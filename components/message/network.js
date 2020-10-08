const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const multer = require('multer');

const router = express.Router();

// Para la carga de archivos
const upload = multer({
  dest: 'public/files/',
});

router.get('/', (req, res) => {
  res.header({
    'custom-header': 'Nuestro valor personalizado',
  });

  const filterChat = req.query.chat || null;

  controller
    .getMessages(filterChat)
    .then((data) => {
      response.success(req, res, data);
    })
    .catch((e) => {
      response.error(req, res, 'Información invalida', 500, e);
    });
});
router.post('/', upload.single('file'), (req, res) => {
  // http://localhost:3000/message?error=ok
  controller
    .addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((e) => {
      response.error(req, res, 'Información invalida', 400, e);
    });
});
router.patch('/:id', (req, res) => {
  // http://localhost:3000/message/32432453453
  controller
    .updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((e) => {
      response.error(req, res, 'Información invalida', 500, e);
    });
});
router.delete('/:id', (req, res) => {
  controller
    .deleteMessages(req.params.id)
    .then((data) => {
      response.success(req, res, `Mensaje con id: ${req.params.id} fue eliminado correctamente`, 200);
    })
    .catch((e) => {
      response.error(req, res, 'Información invalida', 500, e);
    });
});

module.exports = router;
