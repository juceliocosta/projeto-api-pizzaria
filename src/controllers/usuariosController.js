const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');

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
    nome, email, senha: senhaCriptografada, endereco, tipo_usuario: tipo_usuario
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
    return res.json(usuario);
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


module.exports = {
  obterUsuarios,
  criarUsuario,
  atualizarUsuarioPorID,
  deletarUsuarioPorID
};