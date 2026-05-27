const express = require('express');
const pedidosRoutes = express.Router();
const pedidos = require('../controllers/pedidosController');
const { autenticarJWT } = require('../middlewares/autenticacao');

pedidosRoutes.post('/', autenticarJWT, pedidos.criarPedido);
pedidosRoutes.get('/', autenticarJWT, pedidos.obterPedidos);
pedidosRoutes.put('/:id', autenticarJWT, pedidos.atualizarPedidoPorID);
pedidosRoutes.delete('/:id', autenticarJWT, pedidos.deletarPedidoPorID);
pedidosRoutes.post('/produtos', autenticarJWT, pedidos.adicionarProdutoAoPedido);
pedidosRoutes.get('/:id/produtos', autenticarJWT, pedidos.listarProdutosDoPedidoPorID);
pedidosRoutes.delete('/:id/produtos/:produtoId', autenticarJWT, pedidos.removerProdutoDoPedidoPorID);

module.exports = pedidosRoutes;