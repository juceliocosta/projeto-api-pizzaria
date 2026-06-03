const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  storage: "pizzalab.sqlite",
});

module.exports = sequelize;