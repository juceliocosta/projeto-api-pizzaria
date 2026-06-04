const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API da Lanchonete/Pizzaria',
      version: '1.0.0',
      description: 'Documentação da API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [
      {
        name: 'Usuários',
        description: 'Login e registro de usuários',
      },
      {
        name: 'Produtos',
        description: 'Gestão de produtos',
      },
            {
        name: 'Pedidos',
        description: 'Gestão de pedidos',
      },
    ],
  },
  // Definição de onde swagger-jsdoc vai procurar os caminhos
  apis: ['./src/routes/*.js'], 
};

const swaggerOptions = swaggerJsdoc(options);

module.exports = swaggerOptions;