# 🏥 HealthHub — Solução Integrada de E-commerce de Saúde

O **HealthHub** é uma aplicação **Fullstack** moderna focada em comércio eletrónico de **produtos de saúde e bem-estar**. O projeto foi desenvolvido com **arquitetura MVC no backend** e uma **interface reativa e fortemente tipada no frontend**, com o objetivo de simular um e-commerce real, indo além de um CRUD básico.

Este repositório foi pensado como um **case completo de portfólio**, demonstrando organização, boas práticas e domínio do fluxo ponta a ponta de uma aplicação web.

---

## 🎯 Objetivo do Projeto

Demonstrar domínio prático de tecnologias modernas do ecossistema JavaScript/TypeScript, com foco em:

* Autenticação persistente e segura
* Gestão de estado de carrinho de compras
* Integração com base de dados relacional
* Separação clara de responsabilidades (MVC)
* Estrutura escalável e legível para ambientes profissionais

O HealthHub simula um **cenário real de e-commerce**, com fluxos completos de utilizador, compra e gestão de encomendas.

---

## ✨ Funcionalidades

### 🔐 Autenticação e Segurança

* Registo e login de utilizadores com validação de credenciais
* Autenticação baseada em **JWT (JSON Web Tokens)**
* Tokens com tempo de expiração configurável
* Encriptação de palavras-passe com **BcryptJS**
* Proteção de rotas sensíveis (carrinho, checkout e histórico)

---

### 🛒 Experiência de Compra

* Catálogo dinâmico de produtos
* Exibição de imagens, descrições e preços
* Pesquisa e filtros integrados ao backend
* Paginação para otimização de performance
* Sistema de favoritos
* Gestão completa de carrinho:

  * Adição e remoção de produtos
  * Alteração de quantidades
  * Cálculo automático de totais e portes

---

### 📦 Gestão de Encomendas

* Checkout dividido em etapas (step-by-step)
* Separação entre morada de entrega e pagamento
* Histórico de encomendas por utilizador
* Sistema de estados de pedido:

  * Pendente
  * Pago
  * Enviado

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* React 18
* TypeScript
* Vite
* React Router DOM (SPA)
* CSS3 moderno com variáveis e layouts flexíveis

### Backend

* Node.js
* Express
* TypeORM
* SQLite (base de dados relacional em ficheiro)
* JWT para autenticação
* BcryptJS para segurança de palavras-passe

---

## 📂 Estrutura de Pastas

```
src/
├── client/                 # Frontend
│   ├── components/         # Componentes reutilizáveis (Navbar, Cards, etc.)
│   ├── views/              # Páginas principais da aplicação
│   ├── utils/              # Hooks de autenticação e instância da API
│   └── styles/             # Estilos CSS modulares
│
└── server/                 # Backend
    ├── controllers/        # Lógica de negócio e regras da aplicação
    ├── entities/           # Models / Entidades (TypeORM)
    ├── routes/             # Definição dos endpoints da API
    └── images/             # Imagens dos produtos
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

* Node.js (v18 ou superior)
* npm ou yarn

---

### Instalação

Clone o repositório:

```bash
git clone https://github.com/Etuarda/HealthHub.git
cd HealthHub
```

Instale todas as dependências (client e server):

```bash
npm install
```

---

### Configuração do Ambiente

No diretório `src/server`, crie ou verifique o ficheiro `.env`:

```env
JWT_SECRET=seu_segredo_super_secreto
JWT_EXPIRES=2h
```

---

### Execução

Inicie o frontend e o backend em modo de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

## 📡 Endpoints Principais (API)

| Método | Endpoint           | Descrição                              |
| ------ | ------------------ | -------------------------------------- |
| POST   | /api/register      | Cria um novo utilizador                |
| POST   | /api/login         | Autentica e retorna token JWT          |
| GET    | /api/produtos      | Lista produtos com filtros e paginação |
| POST   | /api/favoritos/:id | Adiciona produto aos favoritos         |
| POST   | /api/pedidos       | Cria uma nova encomenda                |

---

## ✒️ Autoria

Desenvolvido por **Eduarda**.

Projeto criado para **fins de estudo e portfólio**, aplicando conceitos avançados de desenvolvimento **Fullstack**, organização de código, segurança e boas práticas adotadas no mercado profissional.


