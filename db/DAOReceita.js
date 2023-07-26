const {Receita, ReceitaIngrediente, Unidade, Ingrediente} = require('../models/index');

class DAOReceita {
  static async insert(nome, descricao, instrucao, ingredientes, usuario) {
    try {
      let receita = await Receita.create({
        nome: nome,
        descricao: descricao,
        instrucao: instrucao,
        usuarioId: usuario,
      });
      ingredientes.forEach(async (ingrediente) => {
        await ReceitaIngrediente.create({
          receitaId: receita.id,
          ingredienteId: ingrediente.ingredienteId,
          quantidade: ingrediente.quantidade,
          unidadeId: ingrediente.unidadeId,
        });
      });
      return true;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async update(id, nome, descricao, instrucao, ingredientes, usuario) {
    try {
      await Receita.update(
        {nome: nome, descricao: descricao, instrucao: instrucao, usuarioId: usuario},
        {where: {id: id}}
      );

      await ReceitaIngrediente.destroy({where: {receitaId: id}});

      ingredientes.forEach(async (ingrediente) => {
        await ReceitaIngrediente.create({
          receitaId: id,
          ingredienteId: ingrediente.ingredienteId,
          quantidade: ingrediente.quantidade,
          unidadeId: ingrediente.unidadeId,
        });
      });
      return true;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async delete(id, usuarioId) {
    try {
      await Receita.destroy({where: {id: id, usuarioId: usuarioId}});
      await ReceitaIngrediente.destroy({where: {receitaId: id}});
      return true;
    } catch (error) {
      console.log(error.toString());
      return false;
    }
  }

  static async getAll() {
    try {
      let receitas = await Receita.findAll({order: ['nome']});
      return receitas;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getByUser(id) {
    try {
      let receitas = await Receita.findAll({
        order: ['nome'],
        where: {usuarioId: id},
      });
      return receitas;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }

  static async getOne(id) {
    try {
      let receita = await Receita.findOne({
        where: {id: id},
        include: {model: Ingrediente, include: {model: Unidade}},
      });
      return receita;
    } catch (error) {
      console.log(error.toString());
      return undefined;
    }
  }
}

module.exports = DAOReceita;
