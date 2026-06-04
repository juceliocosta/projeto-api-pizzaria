const express = require('express');
const usuariosRoutes = express.Router();
const usuarios = require('../controllers/usuariosController');
const { autenticarJWT } = require('../middlewares/autenticacao');
const { isAdmin } = require('../middlewares/isAdmin');

/**
 * @swagger
 * /usuarios:
 *  post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
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
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Nome, Email e Senha são obrigatórios
 *       500:
 *         description: Erro ao criar usuário no banco de dados
 */
usuariosRoutes.post('/', usuarios.criarUsuario);
usuariosRoutes.get('/', autenticarJWT, isAdmin, usuarios.obterUsuarios);
usuariosRoutes.put('/:id', autenticarJWT, usuarios.atualizarUsuarioPorID);
usuariosRoutes.delete('/:id', autenticarJWT, usuarios.deletarUsuarioPorID);
usuariosRoutes.post('/login', usuarios.logarUsuario);

module.exports = usuariosRoutes;