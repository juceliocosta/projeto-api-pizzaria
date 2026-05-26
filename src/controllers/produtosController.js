const Produto = require('../models/Produto');
const produtosController = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    return res.json(produtos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao obter produtos do banco de dados.' });
  }
};

module.exports = {
  produtosController,
  // criarProdutoController,
  // obterProdutoController,
  // atualizarProdutoController,
  // excluirProdutoController
};