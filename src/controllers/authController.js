const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const logarUsuario = async (req, res) => {
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
      role: 'Cliente'
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
  logarUsuario 
};