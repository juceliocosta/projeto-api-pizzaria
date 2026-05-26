const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

// execução de função imediata IIFE
const Produto = require('./produto')(sequelize);
const ProdutoVariacao = require('./produto_variacao')(sequelize);
const Adicional = require('./adicional')(sequelize);
const ProdutoAdicional = require('./produto_adicional')(sequelize);
const Endereco = require('./endereco')(sequelize);
const Usuario = require('./usuario')(sequelize);
const Pedido = require('./pedido')(sequelize);
const PedidoProduto = require('./pedido_produto')(sequelize);


//-------------------------------------------------------------------------------------
// Relacionamento: Produto -> Variações (1 para Muitos)
Produto.hasMany(ProdutoVariacao, { foreignKey: 'produto_id' });
ProdutoVariacao.belongsTo(Produto, { foreignKey: 'produto_id' });

// Relacionamento NxN: Produtos e Adicionais através da tabela pivô
Produto.belongsToMany(Adicional, { through: ProdutoAdicional, foreignKey: 'produto_id' });
Adicional.belongsToMany(Produto, { through: ProdutoAdicional, foreignKey: 'adicional_id' });

// Relacionamento: Endereço -> Usuários (1 para Muitos)
Endereco.hasMany(Usuario, { foreignKey: 'endereco_id' });
Usuario.belongsTo(Endereco, { foreignKey: 'endereco_id' });

// Relacionamento: Usuário -> Pedidos (1 para Muitos) - Cliente e Entregador
Usuario.hasMany(Pedido, { foreignKey: 'cliente_id', as: 'Compras' });
Pedido.belongsTo(Usuario, { foreignKey: 'cliente_id', as: 'Cliente' });

Usuario.hasMany(Pedido, { foreignKey: 'entregador_id', as: 'Entregas' });
Pedido.belongsTo(Usuario, { foreignKey: 'entregador_id', as: 'Entregador' });

// Relacionamento: Endereço -> Pedidos (1 para Muitos)
Endereco.hasMany(Pedido, { foreignKey: 'endereco_id' });
Pedido.belongsTo(Endereco, { foreignKey: 'endereco_id' });

// Relacionamento NxN: Pedidos e Variações de Produtos através de pedido_produtos
Pedido.belongsToMany(ProdutoVariacao, { through: PedidoProduto, foreignKey: 'pedido_id' });
ProdutoVariacao.belongsToMany(Pedido, { through: PedidoProduto, foreignKey: 'produto_variacao_id' });
//-------------------------------------------------------------------------------------

(async () => {
  await sequelize.sync();
})();

module.exports = {
  sequelize,
  Produto,
  ProdutoVariacao,
  Adicional,
  ProdutoAdicional,
  Endereco,
  Usuario,
  Pedido,
  PedidoProduto,
};