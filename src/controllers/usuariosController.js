const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario, Pedido } = require('../models');

const criarUsuario = async (req, res) => {
try {
  const { nome, email, senha, endereco } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  // Verifica se o e-mail já está cadastrado
  const usuarioExiste = await Usuario.findOne({ where: { email } });
  if (usuarioExiste) {
    return res.status(400).json({ error: 'Este e-mail já está em uso.' });
  }

  // Criptografa a senha
  const salt = await bcrypt.genSalt(10);
  const senhaCriptografada = await bcrypt.hash(senha, salt);

  const tipo_usuario = 'Cliente';
  const novoUsuario = await Usuario.create({
    nome, email, senha: senhaCriptografada, endereco: endereco || "", tipo_usuario: tipo_usuario
  });

  return res.status(201).json({ message: 'Usuário cadastrado com sucesso!'});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao cadastrar usuário no banco de dados.' });
  }
};

const obterUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    const usuariosSemSenha = usuarios.map(usuario => {
      const { senha, ...usuarioSemSenha } = usuario.toJSON();
      return usuarioSemSenha;
    });
    return res.json(usuariosSemSenha);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao obter usuários do banco de dados.' });
  }
};

const atualizarUsuarioPorID = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, endereco } = req.body;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

      // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);
    
    await usuario.update({ nome, email, senha: senhaCriptografada, endereco });
    const { senha: _, ...usuarioSemSenha } = usuario.toJSON();
    return res.json(usuarioSemSenha);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

const deletarUsuarioPorID = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    await usuario.destroy();
    return res.status(200).json({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
};

const logarUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    const usuario = await Usuario.findOne({ where: { email } });
    
    // Verifica se o usuário existe e se a senha é válida
    const senhaValida = usuario ? await bcrypt.compare(senha, usuario.senha) : false;

    if (!usuario || !senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
    

    const payload = {
      id: usuario.id,            
      email: usuario.email,      
      role: 'Cliente'
    };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // verifica se o pedido vinculado ao usuário existe
    const pedidoExistente = await Pedido.findOne({ where: { usuario_id: usuario.id } });
    if (!pedidoExistente) {
      await Pedido.create(
        { 
          usuario_id: usuario.id, 
          status_entrega: 'pendente', 
          status_pagamento: 'pendente', 
          valor_total: 0,
          observacao: "" 
        }
      );
    }

    return res.status(200).json({
      token,
      message: 'Autenticação bem-sucedida!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao autenticar usuário.' });
  }
};


module.exports = {
  obterUsuarios,
  criarUsuario,
  atualizarUsuarioPorID,
  deletarUsuarioPorID,
  logarUsuario
};