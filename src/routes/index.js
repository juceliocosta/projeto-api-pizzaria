const { Router } = require('express');
const produtosRouter = require('./produtosRouter');
const usuariosRouter = require('./usuariosRouter');

const routes = Router();

routes.use('/produtos', produtosRouter);
routes.use('/usuarios', usuariosRouter);


module.exports = routes;