const { criarAdminInicial } = require('../config/adminSetup');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  { 
    dialect: process.env.DB_DIALECT,
    storage: "pizzalab.sqlite", // Para SQLite
  }
);


// execução de função imediata IIFE
const Produto = require('./produto')(sequelize);
const Usuario = require('./usuario')(sequelize);
const Pedido = require('./pedido')(sequelize);
const PedidoProduto = require('./pedidoProduto')(sequelize);


// Relacionamento: Usuário -> Pedidos (1 para Muitos)
Usuario.hasMany(Pedido, { foreignKey: 'usuario_id', as: 'Compras' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'Cliente' });


 // Relacionamento NxN: Pedidos e Produtos através de pedido_produtos
Pedido.belongsToMany(Produto, { through: PedidoProduto, foreignKey: 'pedido_id' });
Produto.belongsToMany(Pedido, { through: PedidoProduto, foreignKey: 'produto_id' });


(async () => {
  await sequelize.sync();
  await criarAdminInicial(Usuario);
})();

module.exports = {
  sequelize,
  Produto,
  Usuario,
  Pedido,
  PedidoProduto,
};