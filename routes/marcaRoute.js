const express = require('express');
const router = express.Router();

const MarcaController = require('../controllers/MarcaController');
const checkLogin = require('../middleware/checkLogin');

router.get('/', checkLogin, MarcaController.getAll);
router.get('/novo', checkLogin, MarcaController.renderNovo);
router.post('/', checkLogin, MarcaController.create);
router.get('/:id', checkLogin, MarcaController.renderEditar);
router.post('/salvar', checkLogin, MarcaController.update);
router.get('/delete/:id', checkLogin, MarcaController.delete);

module.exports = router;
