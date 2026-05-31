const isAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.payload.role === 'Admin') {
    return next();
  }
  return res.status(403).send('Acesso negado: Requer privilégios de administrador.');
};

module.exports = { isAdmin };