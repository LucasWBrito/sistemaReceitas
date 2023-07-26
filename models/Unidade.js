const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Unidade = sequelize.define('unidade', {
  nome: Sequelize.STRING,
  simbolo: Sequelize.STRING,
});

module.exports = Unidade;
