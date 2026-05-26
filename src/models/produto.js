const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Produto', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome_variacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preco: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
