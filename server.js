const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./src/config/swagger');
const cors = require('cors');
const corsOptions = require('./src/config/cors');

const app = express();
app.use(express.json());

// Responder a preflight requests
app.use(cors(corsOptions));

// Middleware para log de requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

const PORT = process.env.PORT || 3000;

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

// Rota de login
app.post('/login', (req, res) => {
     const { email, password } = req.body;
     // Simulação de validação (substituir pelo banco em casos reais)
     if (email === 'admin@livraria.com' && password === '123456') {
       const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
       return res.json({ token });
     }
     res.status(401).send('Credenciais inválidas.');
   });

// Servir arquivos estáticos da pasta raiz
app.use(express.static(path.join(__dirname)));

// Rota básica para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// Rotas
const livrosRouter = require('./src/routes/livros');
app.use('/livros', livrosRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});