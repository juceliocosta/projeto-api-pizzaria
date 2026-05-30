const { where } = require('sequelize');
const { Pedido, Produto, Usuario, PedidoProduto } = require('../models');

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
    const usuario_id = req.usuario.payload.id;
    const { produto_id, quantidade } = req.body;
    // Verifica se o pedido pertence ao usuário logado
    const pedido = await Pedido.findOne({ where: { usuario_id } });
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido do usuário não encontrado.' });
    }

    const produto = await Produto.findByPk(produto_id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    const item = await PedidoProduto.findOne({
      where: { pedido_id: pedido.id, produto_id: produto.id }
    });

    if (item) {
      item.quantidade += 1;
      await item.save();
    } else {
      await PedidoProduto.create({
        pedido_id: pedido.id,
        produto_id: produto.id,
        quantidade: quantidade || 1
      });
    }

    return res.status(201).json({ message: 'Produto adicionado ao pedido com sucesso!' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao adicionar produto ao pedido.' });
  }
};

const listarProdutosPedidos = async (req, res) => {
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

const listarProdutosDoPedidoDoUsuario = async (req, res) => {
  try {
    const usuario_id = req.usuario.payload.id;
    const pedido = await Pedido.findOne({
      where: { usuario_id },
      include: {
        model: Produto,
        through: { attributes: ['quantidade'] }
      }
    });

    if (!pedido) {
      return res.status(404).json({
        error: 'Pedido do usuário não encontrado.'
      });
    }
    return res.json(pedido.Produtos);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar produtos do pedido.' });
  }
};

const removerProdutoDoPedido = async (req, res) => {
try {
    const usuario_id = req.usuario.payload.id;
    const { id } = req.params;
    console.log('ID do produto a remover:', id);
    // Verifica se o pedido pertence ao usuário logado
    const pedido = await Pedido.findOne({ where: { usuario_id } });
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido do usuário não encontrado.' });
    }

    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    const item = await PedidoProduto.findOne({
      where: { pedido_id: pedido.id, produto_id: produto.id }
    });

    if (item.quantidade > 1) {
      item.quantidade -= 1;
      await item.save();
    } else {
      await item.destroy();
    } 

    return res.status(201).json({ message: 'Produto removido do pedido com sucesso!' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao remover produto do pedido.' });
  }
};


module.exports = {
  obterPedidosPorID,
  obterPedidos,
  criarPedido,
  atualizarPedidoPorID,
  deletarPedidoPorID,
  adicionarProdutoAoPedido,
  listarProdutosPedidos,
  listarProdutosDoPedidoDoUsuario,
  removerProdutoDoPedido
};