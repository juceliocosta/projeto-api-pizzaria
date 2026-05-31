const express = require('express');
const pedidosRoutes = express.Router();
const pedidos = require('../controllers/pedidosController');
const { autenticarJWT } = require('../middlewares/autenticacao');

// rotas específicas devem ser declaradas antes das rotas parametrizadas
pedidosRoutes.post('/produtos', autenticarJWT, pedidos.adicionarProdutoAoPedido);
pedidosRoutes.delete('/produtos/:id', autenticarJWT, pedidos.removerProdutoDoPedido);

pedidosRoutes.get('/', autenticarJWT, pedidos.obterPedidoDoUsuario);
pedidosRoutes.put('/:id', autenticarJWT, pedidos.atualizarPedidoPorID);
pedidosRoutes.delete('/:id', autenticarJWT, pedidos.deletarPedidoPorID);


module.exports = pedidosRoutes;