const sequelize = require('../db/sequelize');

const Usuario = require('./Usuario');
const Receita = require('./Receita');
const Ingrediente = require('./Ingrediente');
const Unidade = require('./Unidade');
const ReceitaIngrediente = require('./ReceitaIngrediente');

Receita.belongsToMany(Ingrediente, {
  through: ReceitaIngrediente,
  foreignKey: 'receitaId',
});
Ingrediente.belongsToMany(Receita, {through: ReceitaIngrediente, foreignKey: 'ingredienteId'});

Unidade.belongsToMany(Ingrediente, {
  through: ReceitaIngrediente,
  foreignKey: 'unidadeId',
});
Ingrediente.belongsToMany(Unidade, {through: ReceitaIngrediente, foreignKey: 'ingredienteId'});

Usuario.hasMany(Receita, {
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});
Receita.belongsTo(Usuario);

sequelize.sync({force: false});

module.exports = {Usuario, Receita, Ingrediente, Unidade, ReceitaIngrediente};
