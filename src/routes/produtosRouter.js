const express = require('express');
const produtosRoutes = express.Router();
const produtos = require('../controllers/produtosController');
const { autenticarJWT } = require('../middlewares/autenticacao');
const { isAdmin } = require('../middlewares/isAdmin');

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retorna a lista de produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do produto
 *                   nome:
 *                     type: string
 *                     description: Nome do produto
 *                   categoria:
 *                     type: string
 *                     description: Categoria do produto
 *                   nome_variacao:
 *                     type: string
 *                     description: Nome da variação do produto
 *                   descricao:
 *                     type: string
 *                     description: Descrição do produto
 *                   preco:
 *                     type: number
 *                     description: Preço do produto
 *       500:
 *         description: Erro ao obter produto do banco de dados
 */
produtosRoutes.get('/', produtos.obterProdutos);

/**
 * @swagger
 * /produtos:
 *  post:
 *     summary: Registra um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do produto
 *               categoria:
 *                 type: string
 *                 description: Categoria do produto
 *               nome_variacao:
 *                 type: string
 *                 description: Nome da variação do produto
 *               descricao:
 *                 type: string
 *                 description: Descrição do produto
 *               preco:
 *                 type: number
 *                 description: Preço do produto
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Dados inválidos para criação do produto
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: "Acesso negado: Requer privilégios de administrador"
 *       500:
 *         description: Erro ao criar produto no banco de dados
 */
produtosRoutes.post('/', autenticarJWT, isAdmin, produtos.criarProduto);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Retorna um produto por ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do produto
 *                 nome:
 *                   type: string
 *                   description: Nome do produto
 *                 categoria:
 *                   type: string
 *                   description: Categoria do produto
 *                 nome_variacao:
 *                   type: string
 *                   description: Nome da variação do produto
 *                 descricao:
 *                   type: string
 *                   description: Descrição do produto
 *                 preco:
 *                   type: number
 *                   description: Preço do produto
 *       500:
 *         description: Erro ao obter produto do banco de dados
 */
produtosRoutes.get('/:id', produtos.obterProdutoPorID);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto por ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do produto
 *               categoria:
 *                 type: string
 *                 description: Categoria do produto
 *               nome_variacao:
 *                 type: string
 *                 description: Nome da variação do produto
 *               descricao:
 *                 type: string
 *                 description: Descrição do produto
 *               preco:
 *                 type: number
 *                 description: Preço do produto
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Dados inválidos para atualização do produto
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: "Acesso negado: Requer privilégios de administrador"
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao atualizar produto no banco de dados
 */
produtosRoutes.put('/:id', autenticarJWT, isAdmin, produtos.atualizarProdutoPorID);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Exclui um produto por ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: "Acesso negado: Requer privilégios de administrador"
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao excluir produto do banco de dados
 */
produtosRoutes.delete('/:id', autenticarJWT, isAdmin, produtos.deletarProdutoPorID);

module.exports = produtosRoutes;