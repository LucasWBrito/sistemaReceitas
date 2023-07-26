const DAOReceita = require('../db/DAOReceita');

const getReceitas = async (req, res) => {
  let receitas = await DAOReceita.getAll();
  if (receitas.length > 0) {
    res.render('receita/listaReceitas', {receitas: receitas});
  } else {
    res.render('error', {msg: 'Error ao buscar receitas'});
  }
};

const getReceita = async (req, res) => {
  let receita = await DAOReceita.getOne(req.params.id);
  if (receita) {
    res.render('receita/detalhesReceita', {receita: receita, msg: ''});
  } else {
    res.render('error', {msg: 'Erro ao visualizar receita'});
  }
};

const getMinhasReceitas = async (req, res) => {
  let receitas = await DAOReceita.getByUser(req.session.usuario.id);
  if (receitas.length > 0) {
    res.render('receita/minhasReceitas', {receitas: receitas, msg: ''});
  } else {
    res.render('receita/minhasReceitas', {
      receitas: [],
      msg: 'Voce ainda não cadastrou nenhuma receita',
    });
  }
};

const getNovaReceita = async (req, res) => {
  res.render('receita/novaReceita', {msg: ''});
};

const postNovaReceita = async (req, res) => {
  const {nome, descricao, instrucao, ingredientes} = req.body;
  let result = await DAOReceita.insert(
    nome,
    descricao,
    instrucao,
    ingredientes,
    req.session.usuario.id
  );
  res.json(result);
};

const getEditarReceita = async (req, res) => {
  let receita = await DAOReceita.getOne(req.params.id);
  res.render('receita/editarReceita', {receita: receita, msg: ''});
};

const postEditarReceita = async (req, res) => {
  const {nome, descricao, instrucao, ingredientes} = req.body;
  let result = await DAOReceita.update(
    parseInt(req.params.id),
    nome,
    descricao,
    instrucao,
    ingredientes,
    req.session.usuario.id
  );
  res.json(result);
};

const deletarReceita = async (req, res) => {
  let result = await DAOReceita.delete(req.params.id, req.session.usuario.id);
  if (result) {
    res.redirect('/minhasReceitas');
  } else {
    res.render('error', {msg: 'Erro ao deletar receita'});
  }
};

module.exports = {
  getReceitas,
  getReceita,
  getMinhasReceitas,
  getNovaReceita,
  postNovaReceita,
  getEditarReceita,
  postEditarReceita,
  deletarReceita,
};
