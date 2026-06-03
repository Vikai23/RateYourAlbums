# 🎵 RateYourAlbums - Projeto Final AWC

Projeto de conclusão da disciplina de **Aplicações Web em Camadas**.

O **RateYourAlbums** é uma API REST estruturada em arquitetura MVC para cadastro e avaliação de álbuns musicais. A aplicação permite o cadastro de usuários, autenticação com JWT, gerenciamento de álbuns, músicas/faixas e avaliações com notas de 1 a 5 estrelas.

A proposta do projeto é funcionar como um “Letterboxd de música”, onde visitantes podem visualizar álbuns, faixas e reviews, enquanto usuários autenticados podem criar, editar e excluir conteúdos.

---

## 🚀 Tecnologias utilizadas

* **Node.js**: ambiente de execução JavaScript
* **Express**: framework para criação da API REST
* **Prisma ORM**: ORM utilizado para comunicação com o banco de dados
* **MySQL**: banco de dados relacional
* **Bcrypt**: criptografia de senhas
* **JSON Web Token (JWT)**: autenticação por token
* **Dotenv**: gerenciamento de variáveis de ambiente
* **Nodemon**: reinicialização automática do servidor em desenvolvimento

---

## 🛠️ Pré-requisitos

Antes de rodar o projeto, é necessário ter instalado:

* Node.js
* MySQL
* Git

---

## 📥 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Vikai23/RateYourAlbums.git
```

### 2. Acesse a pasta do projeto

```bash
cd RateYourAlbums
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`.

Exemplo:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/rateyouralbums"
JWT_SECRET="sua_chave_secreta"
```

> O arquivo `.env` não deve ser enviado ao GitHub, pois contém dados sensíveis.

### 5. Rode as migrações do banco

```bash
npx prisma migrate dev
```

### 6. Gere o Prisma Client

```bash
npx prisma generate
```

### 7. Inicie o servidor em desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em:

```txt
http://localhost:3000
```

Para iniciar em modo produção:

```bash
npm start
```

---

## 📡 Endpoints da API

### 🔐 Autenticação

| Método | Rota             | Descrição                            | Protegida |
| ------ | ---------------- | ------------------------------------ | --------- |
| POST   | `/auth/register` | Cadastra um novo usuário             | Não       |
| POST   | `/auth/login`    | Realiza login e retorna um token JWT | Não       |

---

### 💿 Álbuns

| Método | Rota          | Descrição                                            | Protegida |
| ------ | ------------- | ---------------------------------------------------- | --------- |
| GET    | `/albums`     | Lista todos os álbuns                                | Não       |
| GET    | `/albums/:id` | Busca um álbum por ID, incluindo faixas e avaliações | Não       |
| POST   | `/albums`     | Cria um novo álbum                                   | Sim       |
| PUT    | `/albums/:id` | Atualiza um álbum existente                          | Sim       |
| DELETE | `/albums/:id` | Remove um álbum                                      | Sim       |

Exemplo de body para criar álbum:

```json
{
  "title": "There Is a Hell Believe Me I've Seen It. There Is a Heaven Let's Keep It a Secret.",
  "artist": "Bring Me The Horizon",
  "genre": "Metalcore",
  "coverUrl": "https://exemplo.com/capa.jpg"
}
```

---

### 🎶 Faixas

| Método | Rota          | Descrição                           | Protegida |
| ------ | ------------- | ----------------------------------- | --------- |
| GET    | `/tracks`     | Lista todas as faixas cadastradas   | Não       |
| POST   | `/tracks`     | Cadastra uma nova faixa em um álbum | Sim       |
| PUT    | `/tracks/:id` | Atualiza uma faixa existente        | Sim       |
| DELETE | `/tracks/:id` | Remove uma faixa                    | Sim       |

Exemplo de body para criar faixa:

```json
{
  "title": "Chelsea Smile",
  "trackNumber": 2,
  "albumId": 1
}
```

---

### ⭐ Reviews

| Método | Rota           | Descrição                        | Protegida |
| ------ | -------------- | -------------------------------- | --------- |
| GET    | `/reviews`     | Lista todas as avaliações        | Não       |
| POST   | `/reviews`     | Cria uma avaliação para um álbum | Sim       |
| PUT    | `/reviews/:id` | Atualiza uma avaliação existente | Sim       |
| DELETE | `/reviews/:id` | Remove uma avaliação             | Sim       |

Exemplo de body para criar review:

```json
{
  "score": 5,
  "comment": "Obra-prima do metalcore",
  "albumId": 1
}
```

---

## 🔒 Autenticação

As rotas protegidas precisam receber um token JWT no header da requisição.

Formato:

```txt
Authorization: Bearer SEU_TOKEN
```

O token é gerado ao realizar login pela rota:

```txt
POST /auth/login
```

---

## 🧠 Regras de negócio

* A nota da review deve estar entre **1 e 5 estrelas**.
* Um usuário não pode avaliar o mesmo álbum mais de uma vez.
* Uma faixa não pode ter o mesmo número dentro do mesmo álbum.
* Visitantes podem visualizar álbuns, faixas e reviews.
* Apenas usuários autenticados podem criar, editar ou excluir dados.

---

## 🏗️ Arquitetura do projeto

```txt
RateYourAlbums/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── album.controller.js
│   │   ├── auth.controller.js
│   │   ├── review.controller.js
│   │   └── track.controller.js
│   ├── lib/
│   │   └── prisma.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── routes/
│   │   ├── album.routes.js
│   │   ├── auth.routes.js
│   │   ├── review.routes.js
│   │   └── track.routes.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🗄️ Models principais

O banco de dados possui os seguintes models principais:

* **User**: usuários cadastrados no sistema
* **Album**: álbuns musicais
* **Track**: faixas pertencentes a um álbum
* **Review**: avaliações feitas por usuários em álbuns

Relacionamentos:

* Um álbum pode ter várias faixas.
* Um álbum pode ter várias avaliações.
* Um usuário pode fazer várias avaliações.
* Cada usuário só pode avaliar um álbum uma vez.

---

## ▶️ Scripts disponíveis

```bash
npm run dev
```

Inicia o servidor com Nodemon em ambiente de desenvolvimento.

```bash
npm start
```

Inicia o servidor com Node em ambiente de produção.

---

## 👤 Autor

Desenvolvido por **Vinícius Sousa**.
