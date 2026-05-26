const { autenticarJWT } = require('../middlewares/autenticacao'); 
const express = require('express');
const router = express.Router();

/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*/

/**
* @swagger
* tags:
*   name: Pizzaria
*   description: Gestão de pizzaria
*/


/**
* @swagger
* /livros:
*   get:
*     summary: Retorna a lista de livros
*     tags: [Livros]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Lista de livros
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID do livro
*                   titulo:
*                     type: string
*                     description: Título do livro
*                   autor:
*                     type: string
*                     description: Autor do livro
*                   preco:
*                     type: number
*                     description: Preço do livro
*       401:
*         description: Token não fornecido ou inválido
*/
router.get('/', autenticarJWT, (req, res) => {
  res.json([
    { id: 1, titulo: 'Livro A', autor: 'Autor A', preco: 29.90 },
    { id: 2, titulo: 'Livro B', autor: 'Autor B', preco: 39.90 },
  ]);
});

/**
* @swagger
* /livros/{id}:
*   get:
*     summary: Retorna um livro específico pelo ID
*     tags: [Livros]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: ID do livro
*     responses:
*       200:
*         description: Livro encontrado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                   description: ID do livro
*                 titulo:
*                   type: string
*                   description: Título do livro
*                 autor:
*                   type: string
*                   description: Autor do livro
*                 preco:
*                   type: number
*                   description: Preço do livro
*       401:
*         description: Token não fornecido ou inválido
*       404:
*         description: Livro não encontrado
*/
router.get('/:id', autenticarJWT, (req, res) => {
  const livros = [
    { id: 1, titulo: 'Livro A', autor: 'Autor A', preco: 29.90 },
    { id: 2, titulo: 'Livro B', autor: 'Autor B', preco: 39.90 },
  ];
  const livro = livros.find(l => l.id === parseInt(req.params.id));
  if (livro) {
    res.json(livro);
  } else {
    res.status(404).send('Livro não encontrado');
  }
});

module.exports = router;

