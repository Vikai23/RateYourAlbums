# 🎵 RateYourAlbums - Projeto Final AWC

Projeto de conclusão da disciplina de **Aplicações Web em Camadas**.

O **RateYourAlbums** é uma API REST estruturada em MVC que gerencia desde o cadastro de usuários e álbuns musicais até o ciclo completo de avaliações (reviews), incluindo autenticação segura via JWT e persistência de dados relacional.

---

## 🚀 Tecnologias e Dependências

* **Node.js**: Ambiente de execução JavaScript
* **Express**: Framework para construção da API e roteamento
* **Prisma ORM**: Mapeamento objeto-relacional para interação com o banco de dados
* **MySQL**: Banco de dados relacional para persistência dos dados
* **JWT (jsonwebtoken)**: Autenticação baseada em tokens para rotas protegidas
* **Bcrypt**: Criptografia de senhas (hashing)
* **Nodemon**: Reinício automático do servidor durante desenvolvimento
* **Dotenv**: Gerenciamento de variáveis de ambiente

---

## 🛠️ Pré-requisitos

* Node.js instalado
* MySQL rodando (local ou cloud)

---

## 📥 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/rate-your-albums.git
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rodar migrações do banco

```bash
npx prisma migrate dev
```

---

### 4. Iniciar o servidor

```bash
npm run dev
```

---

## 📡 Endpoints

### 🔐 Autenticação

* POST `/auth/register` → Criar usuário
* POST `/auth/login` → Login e retorno do JWT

---

### 💿 Álbuns

* GET `/albums` → Listar álbuns
* GET `/albums/:id` → Detalhes do álbum + reviews
* POST `/albums` → Criar álbum (JWT obrigatório)

---

### ⭐ Reviews

* GET `/reviews` → Listar avaliações
* POST `/reviews` → Criar review (JWT obrigatório)

---

## 🏗️ Arquitetura

* `src/controllers` → regras de negócio
* `src/routes` → rotas da API
* `src/middlewares` → autenticação JWT
* `src/lib` → Prisma client
* `prisma/` → schema do banco
