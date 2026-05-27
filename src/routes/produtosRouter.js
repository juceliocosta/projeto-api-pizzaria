const express = require('express');
const produtosRoutes = express.Router();
const produtos = require('../controllers/produtosController');

produtosRoutes.post('/', produtos.criarProduto);
produtosRoutes.get('/', produtos.obterProdutos);
produtosRoutes.put('/:id', produtos.atualizarProdutoPorID);
produtosRoutes.delete('/:id', produtos.deletarProdutoPorID);

module.exports = produtosRoutes;