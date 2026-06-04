const express = require('express');
const usuariosRoutes = express.Router();
const usuarios = require('../controllers/usuariosController');
const { autenticarJWT } = require('../middlewares/autenticacao');
const { isAdmin } = require('../middlewares/isAdmin');

/**
 * @swagger
 * /usuarios:
 *  post:
 *     summary: Registra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do usuário
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *               endereco:
 *                 type: string
 *                 description: Endereço do usuário
 *               tipo_usuario:
 *                 type: string
 *                 description: Tipo de privilégio de usuário
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Nome, Email e Senha são obrigatórios
 *       500:
 *         description: Erro ao criar usuário no banco de dados
 */
usuariosRoutes.post('/', usuarios.criarUsuario);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna a lista de usuarios
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do usuário 
 *                   nome:
 *                     type: string
 *                     description: Nome do usuário
 *                   email:
 *                     type: string
 *                     description: Email do usuário
 *                   endereco:
 *                     type: string
 *                     description: Endereço do usuário
 *                   tipo_usuario:
 *                     type: string
 *                     description: Tipo de privilégio de usuário
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: "Acesso negado: Requer privilégios de administrador" 
 *       500:
 *         description: Erro ao obter usuários do banco de dados
 */
usuariosRoutes.get('/', autenticarJWT, isAdmin, usuarios.obterUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza usuário por ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *               endereco:
 *                 type: string
 *                 description: Endereço do usuário
 *               tipo_usuario:
 *                 type: string
 *                 description: Tipo de privilégio de usuário
 *     responses:
 *       200:
 *         description: Retorna o usuário sem a senha
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar usuário no banco de dados
 */
usuariosRoutes.put('/:id', autenticarJWT, usuarios.atualizarUsuarioPorID);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Exclui um usuário por ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao excluir usuário do banco de dados
 */
usuariosRoutes.delete('/:id', autenticarJWT, usuarios.deletarUsuarioPorID);

/**
 * @swagger
 * /usuarios/login:
 *  post:
 *     summary: Faz login do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida. (Retorna token e usuário)
 *       201:
 *         description: Produto adicionado ao pedido com sucesso
 *       400:
 *         description: Email e senha são obrigatórios
 *       401:
 *         description: Token não fornecido ou credenciais inválidas
 *       500:
 *         description: Erro ao atualizar usuário
 */
usuariosRoutes.post('/login', usuarios.logarUsuario);

module.exports = usuariosRoutes;