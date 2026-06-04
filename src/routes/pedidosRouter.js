const express = require('express');
const pedidosRoutes = express.Router();
const pedidos = require('../controllers/pedidosController');
const { autenticarJWT } = require('../middlewares/autenticacao');

// rotas específicas devem ser declaradas antes das rotas parametrizadas

/**
 * @swagger
 * /pedidos/produtos:
 *  post:
 *     summary: Adiciona um novo produto ao pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedido_id:
 *                 type: number
 *                 description: Id do pedido
 *               produto_id:
 *                 type: number
 *                 description: ID do produto
 *               quantidade:
 *                 type: number
 *                 description: Quantidade do mesmo produto
 *     responses:
 *       201:
 *         description: Produto adicionado ao pedido com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Pedido ou produto do usuário não encontrado
 *       500:
 *         description: Erro ao adicionar produto ao pedido
 */
pedidosRoutes.post('/produtos', autenticarJWT, pedidos.adicionarProdutoAoPedido);

/**
 * @swagger
 * /pedidos/produtos/{id}:
 *   delete:
 *     summary: Remove um produto do pedido por ID
 *     tags: [Pedidos]
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
 *       201:
 *         description: Produto removido do pedido com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Pedido ou produto do usuário não encontrado
 *       500:
 *         description: Erro ao remover produto do pedido
 */
pedidosRoutes.delete('/produtos/:id', autenticarJWT, pedidos.removerProdutoDoPedido);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Retorna o pedido do usuário
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna o pedido do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do pedido
 *                 status_entrega:
 *                   type: string
 *                   description: Status da entrega
 *                 status_pagamento:
 *                   type: string
 *                   description: Status do pagamento
 *                 valor_total:
 *                   type: number
 *                   description: Somatório do preço dos produtos
 *                 observacao:
 *                   type: string
 *                   description: Observação
 *                 usuario_id:
 *                   type: string
 *                   description: Id do usuário
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Pedido do usuário não encontrado
 *       500:
 *         description: Erro ao obter pedido do banco de dados
 */
pedidosRoutes.get('/', autenticarJWT, pedidos.obterPedidoDoUsuario);

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Atualiza um pedido por ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: Id do pedido
 *               status_entrega:
 *                 type: string
 *                 description: Status da entrega
 *               status_pagamento:
 *                 type: string
 *                 description: Status do pagamento
 *               observacao:
 *                 type: string
 *                 description: Observação sobre os produtos
 *               usuario_id:
 *                 type: number
 *                 description: Id do usuário
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
pedidosRoutes.put('/:id', autenticarJWT, pedidos.atualizarPedidoPorID);

//deleta pedido apenas quando a conta de usuário é excluída
//pedidosRoutes.delete('/:id', autenticarJWT, pedidos.deletarPedidoPorID);


module.exports = pedidosRoutes;