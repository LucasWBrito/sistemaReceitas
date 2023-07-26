const express = require('express');
const router = express.Router();
const {adminAuth, auth} = require('../auth/auth');

const unidadeController = require('../controllers/unidadeController');

router.get('/listaUnidades', adminAuth, unidadeController.getListaUnidades);
router.get('/listaUnidadesJSON', auth, unidadeController.getListaUnidadesJSON);
router.get('/novaUnidade', adminAuth, unidadeController.getNovaUnidade);
router.get('/editarUnidade/:id', adminAuth, unidadeController.getEditarUnidade);
router.post('/novaUnidade', adminAuth, unidadeController.postNovaUnidade);
router.post('/editarUnidade/:id', adminAuth, unidadeController.postEditarUnidade);
router.get('/deletarUnidade/:id', adminAuth, unidadeController.deletarUnidade);

module.exports = router;
