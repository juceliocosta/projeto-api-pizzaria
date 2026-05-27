const express = require('express');
const usuariosRoutes = express.Router();
const usuarios = require('../controllers/usuariosController');

usuariosRoutes.post('/', usuarios.criarUsuario);
usuariosRoutes.get('/', usuarios.obterUsuarios);
usuariosRoutes.put('/:id', usuarios.atualizarUsuarioPorID);
usuariosRoutes.delete('/:id', usuarios.deletarUsuarioPorID);

module.exports = usuariosRoutes;