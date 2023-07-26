const DAOUsuario = require('../db/DAOUsuario');

const getIndex = (req, res) => {
  res.render('index', {usuario: req.session.usuario.nome || ''});
};

const getNovoUsuario = (req, res) => {
  res.render('usuario/novoUsuario', {msg: ''});
};

const getLogin = (req, res) => {
  res.render('usuario/login', {msg: ''});
};

const getLogout = (req, res) => {
  req.session.destroy();
  res.redirect('/receitas');
};

const getEditarUsuario = async (req, res) => {
  let usuario = await DAOUsuario.getOne(req.session.usuario.id);
  if (usuario) res.render('usuario/editarUsuario', {usuario: usuario, msg: ''});
  else res.render('error', {msg: 'Erro na tentativa de edição do Usuário.'});
};

const postNovoUsuario = async (req, res) => {
  if (req.body.senha === req.body.senha2) {
    let result = await DAOUsuario.insert(req.body.nome, req.body.login, req.body.senha);
    if (result) {
      res.render('usuario/login', {msg: 'Usuário criado com sucesso'});
    } else {
      res.render('usuario/novoUsuario', {msg: 'Não foi possivel criar o usuario'});
    }
  }
};

const postLogin = async (req, res) => {
  let result = await DAOUsuario.login(req.body.login, req.body.senha);
  if (result) {
    req.session.usuario = result;
    if (result.admin) {
      res.redirect('/admin');
    } else {
      res.redirect('/receitas');
    }
  } else {
    res.render('usuario/login', {msg: 'Usuário ou senha inválidos.'});
  }
};

const postEditarUsuario = async (req, res) => {
  let result = await DAOUsuario.update(
    req.session.usuario.id,
    req.body.nome,
    req.body.login,
    req.body.senha
  );
  if (result) {
    let usuario = await DAOUsuario.getOne(req.session.usuario.id);
    res.render('usuario/editarUsuario', {usuario: usuario, msg: 'Usuário editado com sucesso'});
  } else {
    res.render('error', {msg: 'Falha ao editar usuário'});
  }
};

// Controllers do Admin no contexto do Usuario
const getListaUsuarios = async (req, res) => {
  let usuarios = await DAOUsuario.getAll();
  if (usuarios.length > 0) {
    res.render('usuario/listaUsuarios', {usuarios: usuarios, msg: undefined});
  } else {
    res.render('usuario/listaUsuarios', {usuarios: [], msg: 'Não há usuários cadastrados'});
  }
};

const getRelatorioUsuarios = async (req, res) => {
  let usuarios = await DAOUsuario.getRelatorio();
  console.log(usuarios);
  res.render('usuario/relatorio', {usuarios: usuarios});
};

const deletarUsuario = async (req, res) => {
  let result = await DAOUsuario.delete(req.params.id);
  if (result) res.redirect('/admin/listaUsuarios');
  else res.render('error', {msg: 'Não foi possivel deletar o usuário'});
};

module.exports = {
  getIndex,
  getNovoUsuario,
  getLogin,
  getLogout,
  getRelatorioUsuarios,
  getEditarUsuario,
  postNovoUsuario,
  postLogin,
  postEditarUsuario,
  getListaUsuarios,
  deletarUsuario,
};
