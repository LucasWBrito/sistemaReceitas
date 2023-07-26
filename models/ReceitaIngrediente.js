const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Ingrediente = require('./Ingrediente');
const Receita = require('./Receita');
const Unidade = require('./Unidade');

const ReceitaIngrediente = sequelize.define('receita_ingrediente', {
  receitaId: {
    type: Sequelize.INTEGER,
    references: {
      model: Receita,
      key: 'id',
    },
  },
  ingredienteId: {
    type: Sequelize.INTEGER,
    references: {
      model: Ingrediente,
      key: 'id',
    },
  },
  unidadeId: {
    type: Sequelize.INTEGER,
    references: {
      model: Unidade,
      key: 'id',
    },
  },
  quantidade: Sequelize.STRING,
});

module.exports = ReceitaIngrediente;
