# 🏥 HealthHub — Solução Integrada de E-commerce de Saúde

O **HealthHub** é uma aplicação **Fullstack** moderna focada em comércio eletrónico de produtos de **saúde e bem-estar**.  
O projeto foi desenvolvido com **arquitetura MVC no backend** e uma **interface reativa e tipada no frontend**, com ênfase em fluxos reais de e-commerce, autenticação segura e organização de código para portfólio profissional.

---

## 🎯 Objetivo do Projeto

Demonstrar domínio prático de **React**, **TypeScript** e **TypeORM**, explorando cenários comuns e complexos de aplicações comerciais, como:

- Autenticação persistente com JWT  
- Gestão de estado de carrinho  
- Integração com base de dados relacional  
- Organização de código seguindo boas práticas (MVC, separação de responsabilidades)

O projeto foi pensado como um **case completo de e-commerce**, não apenas como um CRUD simples.

---

## ✨ Funcionalidades

### 🔐 Autenticação e Segurança

- **Registo e Login** com validação de credenciais  
- **JWT (JSON Web Tokens)** com expiração configurável  
- **BcryptJS** para encriptação de palavras-passe  
- **Rotas protegidas** para carrinho, checkout e histórico de encomendas  

---

### 🛒 Experiência de Compra

- **Catálogo dinâmico de produtos** (imagens, descrição e preço)  
- **Pesquisa e filtros** integrados ao backend  
- **Paginação** para melhor performance  
- **Favoritos**, permitindo marcar produtos  
- **Gestão de carrinho**:
  - Adição e remoção de itens  
  - Ajuste de quantidades  
  - Cálculo automático de totais e portes  

---

### 📦 Gestão de Encomendas

- **Checkout step-by-step** (morada → pagamento)  
- **Histórico de pedidos** por utilizador  
- **Tracking de encomendas** com estados:
  - Pendente  
  - Pago  
  - Enviado  

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 18**
- **TypeScript**
- **Vite** (build e dev server)
- **React Router DOM** (SPA)
- **CSS3 moderno** com variáveis e layouts flexíveis

### Backend

- **Node.js**
- **Express**
- **TypeORM**
- **SQLite** (base de dados relacional em ficheiro)
- **JWT + Middleware de autenticação**
- **BcryptJS**

---

## 📂 Estrutura de Pastas

