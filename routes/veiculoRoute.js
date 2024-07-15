const express = require('express');
const router = express.Router();

const VeiculoController = require('../controllers/VeiculoController');
const checkLogin = require('../middleware/checkLogin');

router.get('/', checkLogin, VeiculoController.getAll);
router.get('/novo', checkLogin, VeiculoController.renderNovo);
router.post('/', checkLogin, VeiculoController.create);
router.get('/:id', checkLogin, VeiculoController.renderEditar);
router.post('/salvar', checkLogin, VeiculoController.update);
router.get('/delete/:id', checkLogin, VeiculoController.delete);

module.exports = router;
