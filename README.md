# API Pizzaria

## Descrição Geral
API desenvolvida para gerenciar uma pizzaria, permitindo o cadastro de usuários, produtos e pedidos. O sistema oferece autenticação JWT, rotas protegidas, documentação via Swagger e integração com banco de dados SQLite via Sequelize.

## Tecnologias Utilizadas
- Node.js
- Express.js
- Sequelize ORM
- SQLite3
- JWT (jsonwebtoken)
- swagger-jsdoc
- swagger-ui-express
- Bcrypt
- CORS

## Como Executar o Projeto
1. Clone o repositório e acesse a pasta do projeto.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor em modo desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Funcionalidades e Rotas

### Usuários
- `POST /usuarios/login` — Login do usuário (retorna token JWT)
- `POST /usuarios` — Cadastrar novo usuário
- `GET /usuarios` — Listar usuários
- `PUT /usuarios/:id` — Atualizar usuário
- `DELETE /usuarios/:id` — Remover usuário

### Produtos 
- `POST /produtos` — Cadastrar novo produto
- `GET /produtos` — Listar produtos
- `GET /produtos/:id` — Retorna um produto
- `PUT /produtos/:id` — Atualizar produto
- `DELETE /produtos/:id` — Remover produto

### Pedidos
- `POST /pedidos/produtos` — Adicionar produto ao pedido
- `GET /pedidos` — Listar pedido do usuário
- `PUT /pedidos/:id` — Atualizar pedido
- `DELETE /pedidos/produtos/:id` — Remover um produto do pedido
