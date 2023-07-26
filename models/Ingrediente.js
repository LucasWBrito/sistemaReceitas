const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Ingrediente = sequelize.define('ingrediente', {
  nome: Sequelize.STRING,
});

module.exports = Ingrediente;
