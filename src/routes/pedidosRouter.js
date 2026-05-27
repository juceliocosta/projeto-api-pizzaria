const express = require('express');
const pedidosRoutes = express.Router();
const pedidos = require('../controllers/pedidosController');

pedidosRoutes.post('/', pedidos.criarPedido);
pedidosRoutes.get('/', pedidos.obterPedidos);
pedidosRoutes.put('/:id', pedidos.atualizarPedidoPorID);
pedidosRoutes.delete('/:id', pedidos.deletarPedidoPorID);
pedidosRoutes.post('/:id/produtos', pedidos.adicionarProdutoAoPedido);
pedidosRoutes.get('/:id/produtos', pedidos.listarProdutosDoPedido);
pedidosRoutes.delete('/:id/produtos/:produtoId', pedidos.removerProdutoDoPedido);

module.exports = pedidosRoutes;