const jwt = require('jsonwebtoken');

const autenticarJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).send('Token não fornecido.');
  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = dados;
    next();
  } catch {
    res.status(403).send('Token inválido.');
  }
};
module.exports = { autenticarJWT };
   
