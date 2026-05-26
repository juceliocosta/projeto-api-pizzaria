const { Usuario } = require('../models/usuario');
const bcrypt = require('bcryptjs');

const registrarController = async (req, res) => {
try {
    const { nome, email, senha } = req.body;

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

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      tipo_usuario: 'cliente'
    });

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao cadastrar usuário no banco de dados.' });
  }
};

const logarController = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    const usuario = await Usuario.findOne({ where: { email } });
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!usuario || !senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const payload = {
      id: usuario.id,            
      email: usuario.email,      
      role: usuario.tipo_usuario
    };
    const token = jwt.sign({ payload }, process.env.SECRET_JWT, { expiresIn: '1h' });
    res.status(200).json({ token , message: 'Logado com sucesso!' });

    return res.json({
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
  registrarController, 
  logarController 
};