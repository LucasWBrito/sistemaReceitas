const express = require('express');
const router = express.Router();
const {auth} = require('../auth/auth');

const receitaController = require('../controllers/receitaController');

router.get('/receitas', receitaController.getReceitas);
router.get('/receita/:id', receitaController.getReceita);
router.get('/minhasReceitas', auth, receitaController.getMinhasReceitas);
router.get('/novaReceita', auth, receitaController.getNovaReceita);
router.get('/editarReceita/:id', auth, receitaController.getEditarReceita);
router.post('/novaReceita', auth, receitaController.postNovaReceita);
router.post('/editarReceita/:id', auth, receitaController.postEditarReceita);
router.get('/deletarReceita/:id', auth, receitaController.deletarReceita);

module.exports = router;
