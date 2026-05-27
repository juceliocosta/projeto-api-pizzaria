const { where } = require('sequelize');
const { Pedido, Produto, Usuario } = require('../models');

const criarPedido = async (req, res) => {
  try {
    const { usuario_id } = req.body;
    if (!usuario_id) {
      return res.status(404).json({ error: 'O ID do usuário é obrigatório.' });
    }
    // verifica se o usuário existe
    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    
    if (usuario.id != req.usuario.payload.id) {
      return res.status(403).json({ error: 'Sem permissão.' });
    }

    // verifica se o pedido vinculado ao usuário existe
    const pedidoExistente = await Pedido.findOne({ where: { usuario_id } });
    if (pedidoExistente) {
      return res.status(400).json({ error: 'O usuário já possui um pedido em andamento.' });
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

const obterPedidosPorID = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({ where: { usuario_id: req.usuario.payload.id } });
    return res.json(pedidos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao obter pedidos do banco de dados.' });
  }
};

const atualizarPedidoPorID = async (req, res) => {
  try {
    const { id } = req.params;
    const { status_entrega, status_pagamento, valor_total, observacao } = req.body;
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }
    await pedido.update({ status_entrega, status_pagamento, valor_total, observacao });
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

const listarProdutosDoPedidoPorID = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(id, {
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

const removerProdutoDoPedidoPorID = async (req, res) => {
  try {
    const { pedidoId, produtoId } = req.body;

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
  obterPedidosPorID,
  criarPedido,
  atualizarPedidoPorID,
  deletarPedidoPorID,
  adicionarProdutoAoPedido,
  listarProdutosDoPedidoPorID,
  removerProdutoDoPedidoPorID
};