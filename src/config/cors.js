// Configurar CORS para aceitar requisições da origem específica
const corsOptions = {
  origin: process.env.BASE_URL, // Permitir apenas a origem do seu front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  optionsSuccessStatus: 204 // Responder com status 204 às requisições de preflight
};

module.exports = corsOptions;