const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ProdutoVariacoes', {
    nome_variacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco_base: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
