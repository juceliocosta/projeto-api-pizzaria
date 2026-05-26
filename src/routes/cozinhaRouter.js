const express = require('express');
const router = express.Router();
const autenticarJWT = require('../middlewares/autenticacao');

//router.get('/cozinha/pedidos', autenticarJWT, pedidosCozinhaController);
//router.put('/cozinha/pedidos/:id', autenticarJWT,atualizarStatusPedidoController);

module.exports = router;