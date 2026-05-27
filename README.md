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
- `POST /usuarios` — Cadastrar novo usuário
- `GET /usuarios` — Listar usuários
- `PUT /usuarios/:id` — Atualizar usuário
- `DELETE /usuarios/:id` — Remover usuário
- `POST /usuarios/login` — Login do usuário (retorna token JWT)

### Produtos
- `POST /produtos` — Cadastrar novo produto
- `GET /produtos` — Listar produtos
- `PUT /produtos/:id` — Atualizar produto
- `DELETE /produtos/:id` — Remover produto

### Pedidos (requer autenticação JWT)
- `POST /pedidos` — Criar novo pedido
- `GET /pedidos` — Listar pedidos do usuário autenticado
- `PUT /pedidos/:id` — Atualizar pedido
- `DELETE /pedidos/:id` — Remover pedido
- `POST /pedidos/produtos` — Adicionar produto a um pedido
- `GET /pedidos/:id/produtos` — Listar produtos de um pedido
- `DELETE /pedidos/:id/produtos/:produtoId` — Remover produto de um pedido
