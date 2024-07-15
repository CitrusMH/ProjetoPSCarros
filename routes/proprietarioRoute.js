const express = require('express');
const router = express.Router();

const ProprietarioController = require('../controllers/ProprietarioController');
const checkLogin = require('../middleware/checkLogin');

router.get('/', checkLogin, ProprietarioController.getAll);
router.get('/novo', checkLogin, ProprietarioController.renderNovo);
router.post('/', checkLogin, ProprietarioController.create);
router.get('/:id', checkLogin, ProprietarioController.renderEditar);
router.post('/salvar', checkLogin, ProprietarioController.update);
router.get('/delete/:id', checkLogin, ProprietarioController.delete);

module.exports = router;
