const { Router } = require('express');
const produtosRouter = require('./produtosRouter');
const usuariosRouter = require('./usuariosRouter');
const pedidosRouter = require('./pedidosRouter');

const routes = Router();

routes.use('/produtos', produtosRouter);
routes.use('/usuarios', usuariosRouter);
routes.use('/pedidos', pedidosRouter);


module.exports = routes;