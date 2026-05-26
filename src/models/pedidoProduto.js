const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PedidoProduto', {
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
