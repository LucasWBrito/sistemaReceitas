const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Receita = sequelize.define('receita', {
  nome: Sequelize.STRING,
  descricao: Sequelize.STRING,
  instrucao: Sequelize.STRING,
  foto: Sequelize.STRING,
});

module.exports = Receita;
