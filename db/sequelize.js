const Sequelize = require('sequelize');

const sequelize = new Sequelize('receitasdb', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgresql',
  timezone: '-03:00',
});

module.exports = sequelize;
