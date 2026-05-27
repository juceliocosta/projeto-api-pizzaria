const { Produto } = require('../models');

const criarProduto = async (req, res) => {
  try {
    const { nome, categoria, nome_variacao, descricao, preco } = req.body;
    const produto = await Produto.create({ nome, categoria, nome_variacao, descricao, preco });
    return res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar produto.' });
  }
};

const obterProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    return res.json(produtos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao obter produtos do banco de dados.' });
  }
};

const atualizarProdutoPorID = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, categoria, nome_variacao, descricao, preco } = req.body;
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    await produto.update({ nome, categoria, nome_variacao, descricao, preco });
    return res.json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar produto.' });
  }
};

const deletarProdutoPorID = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    await produto.destroy();
    return res.status(200).json({ message: 'Produto excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir produto.' });
  }
};


module.exports = {
  obterProdutos,
  criarProduto,
  atualizarProdutoPorID,
  deletarProdutoPorID
};