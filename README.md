# 🎵 RateYourAlbums - Projeto Final AWC

Projeto de conclusão da disciplina de **Aplicações Web em Camadas**.

O **RateYourAlbums** é uma API REST estruturada na arquitetura MVC que permite aos usuários cadastrar álbuns musicais e registrar suas avaliações, criando uma comunidade de críticos musicais.

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

### 3. Configure o arquivo .env

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/rate_albums_db"
JWT_SECRET="sua_chave_secreta_aqui"
```

⚠️ O `.env` não deve ser enviado ao GitHub.

---

### 4. Rodar migrações do banco

```bash
npx prisma migrate dev
```

---

### 5. Iniciar o servidor

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

---

## 📌 Observações

* Necessário MySQL ativo
* Configurar `.env` corretamente
* Usar `npm run dev` para desenvolvimento

---

## 📚 Licença

Projeto acadêmico para fins educacionais.
