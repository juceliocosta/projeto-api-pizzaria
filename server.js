const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./src/config/swagger');
const cors = require('cors');
const corsOptions = require('./src/config/cors');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Responder a preflight requests
app.use(cors(corsOptions));
app.use(express.json());

// Middleware para log de requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use(routes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});