const bcrypt = require('bcrypt');

async function criarAdminInicial(Usuario) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  // Verifica se o admin já existe
  const admin = await Usuario.findOne({ where: { email: adminEmail } });

  if (!admin) {
    const password = await bcrypt.hash(adminPassword, 10);
    
    await Usuario.create({
      nome: 'Administrador',
      email: adminEmail,
      senha: password,
      endereco: '',
      tipo_usuario: 'Admin'
    });
    
    console.log('Admin inicial criado com sucesso!');
  } else {
    const password = await bcrypt.hash(adminPassword, 10);
    await admin.update({ senha: password });
    console.log('Admin inicial já existe. Senha atualizada com sucesso!');
  }
}

module.exports = { criarAdminInicial };