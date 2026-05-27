const { Router } = require('express');
const produtosRouter = require('./produtosRouter');

const routes = Router();

routes.use('/produtos', produtosRouter);

module.exports = routes;