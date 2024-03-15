# API REST com Express e Prisma (SQLite)

## Descrição

Este projeto é uma API REST simples criada com Express e Prisma. Desenvolvido com o intuito de ser utilizado em uma aula sobre React e Vue.

## Tecnologias

- Node.js v20 (LTS)
- Express
- Prisma
- Pnpm
- Zod

### Banco de dados:

- SQLite

## Instalação

1. Clone este repositório.
2. Entre na pasta do projeto.
3. Ative o pnpm com o Corepack: corepack enable
4. Instale as dependências com pnpm install.
5. Duplique o arquivo ".env.example" e renomeie para ".env".
6. Rode o script para inicializar o prisma com "pnpm prisma:setup"
7. Inicie a API com "pnpm start".

## Uso

A API fornece endpoints para CRUD (Create, Read, Update, Delete) em um modelo de dados simples. As rotas e seus métodos HTTP são:

- /users: GET - Lista todos os usuários.
- /users/:id: GET - Obtém um usuário por ID.
- /users: POST - Cria um novo usuário.
- /users/:id: PUT - Atualiza um usuário por ID.
- /users/:id: DELETE - Exclui um usuário por ID.

Corpo padrão da requisição:
```json
{
  "id": "int",
  "name": "string",
  "email": "string",
  "city": "string"
}
```

