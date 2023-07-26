const DAOIngrediente = require('../db/DAOIngrediente');

const getListaIngredientes = async (req, res) => {
  let ingredientes = await DAOIngrediente.getAll();
  if (ingredientes.length > 0)
    res.render('ingrediente/listaIngredientes', {ingredientes: ingredientes, msg: undefined});
  res.render('ingrediente/listaIngredientes', {
    ingredientes: [],
    msg: 'Não há Ingredientes cadastrados',
  });
};

const getListaIngredientesJSON = async (req, res) => {
  let ingredientes = await DAOIngrediente.getAll();
  res.json(ingredientes);
};
const getNovoIngrediente = (req, res) => {
  res.render('ingrediente/novoIngrediente', {msg: ''});
};

const getEditarIngrediente = async (req, res) => {
  let ingrediente = await DAOIngrediente.getOne(req.params.id);
  if (ingrediente) res.render('ingrediente/editarIngrediente', {ingrediente: ingrediente, msg: ''});
  res.render('error', {msg: 'Erro na tentativa de edição do Ingrediente.'});
};

const getRelatorioIngrediente = async (req, res) => {
  let ingredientes = await DAOIngrediente.getRelatorio();
  console.log(ingredientes);
  res.render('ingrediente/relatorio', {ingredientes: ingredientes});
};

const postNovoIngrediente = async (req, res) => {
  let result = await DAOIngrediente.insert(req.body.nome);
  if (result)
    res.render('ingrediente/novoIngrediente', {msg: 'Ingrediente adicionado ao Sistema.'});
  res.render('error', {msg: 'Erro na Inserção de Novo Ingrediente'});
};

const postEditarIngrediente = async (req, res) => {
  let result = await DAOIngrediente.update(req.params.id, req.body.nome);
  if (result) res.redirect('/admin/listaIngredientes');
  res.render('error', {msg: 'Erro na Edição do Ingrediente'});
};

const deletarIngrediente = async (req, res) => {
  let result = await DAOIngrediente.delete(req.params.id);
  switch (result) {
    case 0:
      res.redirect('/admin/listaIngredientes');
      break;
    case 1:
      res.render('erro', {
        msg: 'Não é possível excluir um ingrediente já referenciada por uma receita.',
      });
      break;
    case 2:
      res.render('erro', {msg: 'Não foi possível excluir o ingredinte.'});
  }
};

module.exports = {
  getListaIngredientes,
  getListaIngredientesJSON,
  getNovoIngrediente,
  getEditarIngrediente,
  postNovoIngrediente,
  postEditarIngrediente,
  deletarIngrediente,
  getRelatorioIngrediente,
};
