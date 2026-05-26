const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Adicional', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
