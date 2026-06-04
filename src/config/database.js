const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.URIDATABASE);

async function testarConexao() {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
  }
}
testarConexao();

module.exports = sequelize;