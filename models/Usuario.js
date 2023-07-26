const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Usuario = sequelize.define('usuario', {
  nome: Sequelize.STRING,
  login: Sequelize.STRING,
  senha: Sequelize.STRING,
  admin: Sequelize.BOOLEAN,
});

module.exports = Usuario;
