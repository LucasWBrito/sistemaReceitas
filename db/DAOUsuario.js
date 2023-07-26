const {Usuario} = require('../models/index');
const sequelize = require('./sequelize');
const {QueryTypes} = require('sequelize');
const bcrypt = require('bcrypt');

class DAOUsuarios {
  static async insert(nome, login, senha) {
    try {
      await Usuario.create({
        nome: nome,
        login: login,
        senha: bcrypt.hashSync(senha, 10),
        admin: false,
      });
      return true;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async login(login, senha) {
    try {
      let usuario = await Usuario.findOne({where: {login: login}});
      if (usuario)
        if (bcrypt.compareSync(senha, usuario.senha)) {
          return usuario;
        }
      return false;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async update(id, nome, login, senha) {
    try {
      await Usuario.update(
        {login: login, nome: nome, senha: bcrypt.hashSync(senha, 10)},
        {where: {id: id}}
      );
      return true;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async delete(id) {
    try {
      await Usuario.destroy({where: {id: id}});
      return true;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async getAll() {
    try {
      let usuarios = await Usuario.findAll({order: ['nome']});
      return usuarios;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getOne(id) {
    try {
      let usuario = await Usuario.findByPk(id);
      return usuario;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getRelatorio() {
    try {
      let relatorio = sequelize.query(
        `SELECT u.id id, u.nome nome, COUNT(r.id) qtd_receitas
            FROM "usuarios" u
            JOIN "receita" r
            ON u.id = r."usuarioId"
            GROUP BY u.id, u.nome
            LIMIT 10;`,
        {type: QueryTypes.SELECT}
      );
      return relatorio;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }
}

module.exports = DAOUsuarios;
