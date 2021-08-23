<h1 align="center">
    <img alt="Alurakut" title="Alutrakut" src="https://imgur.com/3LOMbPe.png" />
</h1>

## 💻 Sobre o projeto

O Alurakut foi desenvolvido durante a Imersão React da Alura. Inspirada na clássica rede social Orkut, onde é possível criar suas comunidades, enviar scraps e depoimentos para outras pessoas.


## ⚙️ Funcionalidades

- Login através do usuário github
- Criar uma comunidade
- Enviar um recado para outra pessoa
- Criar um depoimento
- Listar comunidades de um usuário
- Listar recados de um usuário
- Listar depoimentos de um usuário
- Exibir perfil do usuário logado
---

## Modificações da aplicação

 - [x] Adição de upload de imagem na criação da comunidade
 - [x] Utilização da API Advice Slip para as frases de conselho do dia
 - [x] Meta Tags para um melhor SEO

## 🎨 Layout

O layout da aplicação está disponível no Figma:

<a href="https://www.figma.com/file/rwxdgelDrKLGbs0QgaKj62/Alurakut">
  <img alt="Made by tgmarinho" src="https://img.shields.io/badge/Acessar%20Layout%20-Figma-%2304D361">
</a>

---

## 🚀 Como executar o projeto


#### 🧭 Rodando a aplicação web (Frontend)

```bash

# Clone este repositório
$ git clone https://github.com/POliveira29/alurakut

# Acesse a pasta do projeto no seu terminal/cmd
$ cd alurakut

# Crie o arquivo .env.local dentro da pasta raiz e coloque as variaveis ambientes da API do cloudinary para o upload de imagens.
$ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
$ NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=""
$ NEXT_PUBLIC_CLOUDINARY_KEY=""
$ CLOUDINARY_SECRET=""

# Instale as dependências
$ yarn install ou npm install

# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website**  ([React](https://reactjs.org/)  +  [Next JS](nextjs.org))

-   **[React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)**
-   **[Styled Components](https://styled-components.com/)**
-   **[React Hooks](https://pt-br.reactjs.org/docs/hooks-intro.htmlm)**
-   **[React Context](https://pt-br.reactjs.org/docs/context.html)**

#### **APIs** 

-   **[Cloudinary](https://cloudinary.com/)**
-   **[Github](https://docs.github.com/pt/rest)**
-   **[Advice Slip](https://api.adviceslip.com/)**

#### **CMS** 
-   **[Dato CMS](https://www.datocms.com/)**

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito por Patrick Oliveira 👋🏽 [Entre em contato!](https://www.linkedin.com/in/patrickoliveira29/)
