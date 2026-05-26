const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

// execução de função imediata IIFE
const Produto = require('./produto')(sequelize);
const Usuario = require('./usuario')(sequelize);
const Pedido = require('./pedido')(sequelize);
const PedidoProduto = require('./pedidoProduto')(sequelize);


// Relacionamento: Usuário -> Pedidos (1 para Muitos) - Cliente e Entregador
Usuario.hasMany(Pedido, { foreignKey: 'cliente_id', as: 'Compras' });
Pedido.belongsTo(Usuario, { foreignKey: 'cliente_id', as: 'Cliente' });


 // Relacionamento NxN: Pedidos e rodutos através de pedido_produtos
Pedido.belongsToMany(Produto, { through: PedidoProduto, foreignKey: 'pedido_id' });
Produto.belongsToMany(Pedido, { through: PedidoProduto, foreignKey: 'produto_id' });



(async () => {
  await sequelize.sync();
})();

module.exports = {
  sequelize,
  Produto,
  Usuario,
  Pedido,
  PedidoProduto,
};