const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Pedido', {
    status_entrega: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status_pagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    observacao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
