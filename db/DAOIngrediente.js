const {Ingrediente} = require('../models/index');
const sequelize = require('./sequelize');
const {QueryTypes} = require('sequelize');

class DAOIngrediente {
  static async insert(nome) {
    try {
      await Ingrediente.create({
        nome: nome,
      });
      return true;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async update(id, nome) {
    try {
      await Ingrediente.update({nome: nome}, {where: {id: id}});
      return true;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async delete(id) {
    try {
      await Ingrediente.destroy({where: {id: id}});
      return 0;
    } catch (error) {
      if (error instanceof Sequelize.ForeignKeyConstraintError) return 1;
      else return 2;
    }
  }

  static async getAll() {
    try {
      let ingredientes = await Ingrediente.findAll({order: ['nome']});
      return ingredientes;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getOne(id) {
    try {
      let ingrediente = Ingrediente.findByPk(id);
      return ingrediente;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getRelatorio() {
    try {
      let relatorio = sequelize.query(
        `SELECT i.id id, i.nome nome, COUNT(ri."receitaId") qtd_receitas 
                            FROM "ingredientes" i 
                            JOIN "receita_ingredientes" ri
                            ON i.id = ri."ingredienteId"
                            GROUP BY i.id, i.nome
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

module.exports = DAOIngrediente;
