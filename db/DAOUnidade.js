const {Unidade} = require('../models/index');

class DAOUnidade {
  static async insert(nome, simbolo) {
    try {
      await Unidade.create({
        nome: nome,
        simbolo: simbolo,
      });
      return true;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async update(id, nome, simbolo) {
    try {
      await Unidade.update({nome: nome, simbolo: simbolo}, {where: {id: id}});
      return true;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async delete(id) {
    try {
      await Unidade.destroy({where: {id: id}});
      return 0;
    } catch (error) {
      if (error instanceof Sequelize.ForeignKeyConstraintError) return 1;
      else return 2;
    }
  }

  static async getAll() {
    try {
      let unidades = await Unidade.findAll({order: ['nome']});
      return unidades;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getOne(id) {
    try {
      let unidade = Unidade.findByPk(id);
      return unidade;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }
}

module.exports = DAOUnidade;
