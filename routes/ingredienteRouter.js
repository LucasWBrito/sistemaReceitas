const express = require('express');
const router = express.Router();
const {adminAuth} = require('../auth/auth');

const ingredienteController = require('../controllers/ingredienteController');

router.get('/listaIngredientes', adminAuth, ingredienteController.getListaIngredientes);
router.get('/listaIngredientesJSON', ingredienteController.getListaIngredientesJSON);
router.get('/relatorioIngrediente', adminAuth, ingredienteController.getRelatorioIngrediente);
router.get('/novoIngrediente', adminAuth, ingredienteController.getNovoIngrediente);
router.get('/editarIngrediente/:id', adminAuth, ingredienteController.getEditarIngrediente);
router.post('/novoIngrediente', adminAuth, ingredienteController.postNovoIngrediente);
router.post('/editarIngrediente/:id', adminAuth, ingredienteController.postEditarIngrediente);
router.get('/deletarIngrediente/:id', adminAuth, ingredienteController.deletarIngrediente);

module.exports = router;
