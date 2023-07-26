const express = require('express');
const router = express.Router();
const {auth, adminAuth} = require('../auth/auth');

const usuarioController = require('../controllers/usuarioController');

router.get('/', auth);
router.get('/admin', adminAuth, usuarioController.getIndex);
router.get('/novoUsuario', usuarioController.getNovoUsuario);
router.get('/login', usuarioController.getLogin);
router.post('/login', usuarioController.postLogin);
router.get('/logout', usuarioController.getLogout);
router.get('/admin/relatorioUsuarios', adminAuth, usuarioController.getRelatorioUsuarios);
router.get('/editarUsuario', auth, usuarioController.getEditarUsuario);
router.post('/novoUsuario', usuarioController.postNovoUsuario);
router.post('/editarUsuario', auth, usuarioController.postEditarUsuario);
router.get('/admin/listaUsuarios', adminAuth, usuarioController.getListaUsuarios);
router.get('/admin/deletarUsuario/:id', adminAuth, usuarioController.deletarUsuario);

module.exports = router;
