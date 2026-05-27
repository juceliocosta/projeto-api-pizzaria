const { Pedido, Produto } = require('../models');

const criarPedido = async (req, res) => {
  try {
    const { usuario_id } = req.body;
    if (!usuario_id) {
      return res.status(404).json({ error: 'O ID do usuário é obrigatório.' });
    }
    const pedido = await Pedido.create(
      { 
        usuario_id, 
        status_entrega: 'pendente', 
        status_pagamento: 'pendente', 
        valor_total: 0,
        observacao: null 
      }
    );
    return res.status(201).json(pedido);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar pedido.' });
  }
};

const obterPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    return res.json(pedidos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao obter pedidos do banco de dados.' });
  }
};

const atualizarPedidoPorID = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id, produto_id, quantidade, valor_total } = req.body;
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }
    await pedido.update({ usuario_id, produto_id, quantidade, valor_total });
    return res.json(pedido);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar pedido.' });
  }
};

const deletarPedidoPorID = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }
    await pedido.destroy();
    return res.status(200).json({ message: 'Pedido excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir pedido.' });
  }
};

const adicionarProdutoAoPedido = async (req, res) => {
  try {
    const { pedido_id, produto_id, quantidade } = req.body;

    const pedido = await Pedido.findByPk(pedido_id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    const produto = await Produto.findByPk(produto_id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    // Associa o produto ao pedido passando dados extras para a tabela pivô
    await pedido.addProduto(produto, {
      through: { quantidade: quantidade || 1 }
    });

    return res.status(201).json({ message: 'Produto adicionado ao pedido com sucesso!' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao adicionar produto ao pedido.' });
  }
};

const listarProdutosDoPedido = async (req, res) => {
  try {
    const { pedido_id } = req.params;

    const pedido = await Pedido.findByPk(pedido_id, {
      include: Produto
    });
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    return res.json(pedido.Produtos);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar produtos do pedido.' });
  }
};

const removerProdutoDoPedido = async (req, res) => {
  try {
    const { pedidoId, produtoId } = req.body; // Ou req.params, dependendo da sua rota

    // 1. Busca o pedido
    const pedido = await Pedido.findByPk(pedidoId);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    // 2. Busca o produto
    const produto = await Produto.findByPk(produtoId);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    // 3. Remove a relação na tabela pivô
    await pedido.removeProduto(produto);

    return res.status(200).json({ message: 'Produto removido do pedido com sucesso!' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao remover produto do pedido.' });
  }
};


module.exports = {
  obterPedidos,
  criarPedido,
  atualizarPedidoPorID,
  deletarPedidoPorID,
  adicionarProdutoAoPedido,
  listarProdutosDoPedido,
  removerProdutoDoPedido
};