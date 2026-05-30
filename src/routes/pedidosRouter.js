const express = require('express');
const pedidosRoutes = express.Router();
const pedidos = require('../controllers/pedidosController');
const { autenticarJWT } = require('../middlewares/autenticacao');

// rotas específicas devem ser declaradas antes das rotas parametrizadas
pedidosRoutes.post('/produtos', autenticarJWT, pedidos.adicionarProdutoAoPedido);
pedidosRoutes.get('/produtos', autenticarJWT, pedidos.listarProdutosDoPedidoDoUsuario);
pedidosRoutes.delete('/produtos/:id', autenticarJWT, pedidos.removerProdutoDoPedido);

pedidosRoutes.post('/', autenticarJWT, pedidos.criarPedido);
pedidosRoutes.get('/', pedidos.obterPedidos);
pedidosRoutes.get('/:id', autenticarJWT, pedidos.obterPedidosPorID);
pedidosRoutes.put('/:id', autenticarJWT, pedidos.atualizarPedidoPorID);
pedidosRoutes.delete('/:id', autenticarJWT, pedidos.deletarPedidoPorID);


module.exports = pedidosRoutes;