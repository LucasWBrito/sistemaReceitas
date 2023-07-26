const DAOUnidade = require('../db/DAOUnidade');

const getListaUnidades = async (req, res) => {
  let unidades = await DAOUnidade.getAll();
  if (unidades.length > 0)
    res.render('unidade/listaUnidades', {unidades: unidades, msg: undefined});
  res.render('unidade/listaUnidades', {
    unidades: [],
    msg: 'Não há Unidades cadastradas',
  });
};

const getListaUnidadesJSON = async (req, res) => {
  let unidades = await DAOUnidade.getAll();
  res.json(unidades);
};

const getNovaUnidade = (req, res) => {
  res.render('unidade/novaUnidade', {msg: ''});
};

const getEditarUnidade = async (req, res) => {
  let unidade = await DAOUnidade.getOne(req.params.id);
  if (unidade) res.render('unidade/editarUnidade', {unidade: unidade});
  res.render('error', {msg: 'Erro na tentativa de edição da unidade de medida.'});
};

const postNovaUnidade = async (req, res) => {
  let result = await DAOUnidade.insert(req.body.nome, req.body.simbolo);
  if (result) res.render('unidade/novaUnidade', {msg: 'Unidade registrada com sucesso.'});
  res.render('error', {msg: 'Erro na Inserção da Nova Unidade'});
};

const postEditarUnidade = async (req, res) => {
  let result = await DAOUnidade.update(req.params.id, req.body.nome, req.body.simbolo);
  if (result) res.redirect('/admin/listaUnidades');
  res.render('error', {msg: 'Erro na Edição da Unidade'});
};

const deletarUnidade = async (req, res) => {
  let result = await DAOUnidade.delete(req.params.id);
  switch (result) {
    case 0:
      res.redirect('/admin/listaUnidades');
      break;
    case 1:
      res.render('erro', {
        msg: 'Não é possível excluir uma unidade já referenciada por uma Receita.',
      });
      break;
    case 2:
      res.render('erro', {msg: 'Não foi possível excluir a unidade.'});
  }
};

module.exports = {
  getListaUnidades,
  getListaUnidadesJSON,
  getNovaUnidade,
  getEditarUnidade,
  postNovaUnidade,
  postEditarUnidade,
  deletarUnidade,
};
