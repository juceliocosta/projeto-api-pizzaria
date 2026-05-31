const express = require('express');
const produtosRoutes = express.Router();
const produtos = require('../controllers/produtosController');
const { autenticarJWT } = require('../middlewares/autenticacao');
const { isAdmin } = require('../middlewares/isAdmin');

produtosRoutes.get('/', produtos.obterProdutos);
produtosRoutes.post('/', autenticarJWT, isAdmin, produtos.criarProduto);
produtosRoutes.put('/:id', autenticarJWT, isAdmin, produtos.atualizarProdutoPorID);
produtosRoutes.delete('/:id', autenticarJWT, isAdmin, produtos.deletarProdutoPorID);

module.exports = produtosRoutes;