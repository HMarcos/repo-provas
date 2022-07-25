# <p align = "center"> RepoProvas </p>

<p align="center">
   <img style="width:300px;height:300px" src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f5c3-fe0f.svg"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-HMarcos-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/HMarcos/repo-provas?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Descrição

O RepoProvas é um sistema de compartilhamento de provas entre estudantes!

**Deploy Link:** https://hmarcos-repoprovas-api.herokuapp.com/

***

## :computer: Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- Prisma ORM
- Postgres SQL
- Jest
- SuperTest

***

## :rocket: Rotas


### Cadastro e Login

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário.
    - headers: {}
    - body: {
        "email": "email@gmail.com",
        "password": "senha",
        "passwordConfirmation": "senha"
    }
```
    
```yml 
POST /sign-in
    - Rota para fazer login.
    - headers: {}
    - body: {
        "email": "email@gmail.com",
        "password": "senha"
    }
    - response: {
        token: "$token"
    }
```

### Provas


```yml
POST /tests (autenticada)
    - Rota que permite o usuário salvar uma prova.
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "Nome da Prova",
        "pdfUrl": "http(s)://url/prova.pdf",
        "categoryId": ID da categoria,
        "disciplineId": ID da disciplina,
        "teacherId": ID do professor
    }
```
    
```yml 
GET /tests?groupBy=disciplines (autenticada)
    - Rota para listar todas os testes agrupados por disciplinas.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml 
GET /tests?groupBy=teachers (autenticada)
    - Rota para listar todas os testes agrupados por professores.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

### Categorias

```yml
GET /categories (autenticada)
    - Rota para listar todas as categorias das provas.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

***

## 🏁 Rodando a aplicação

Este projeto foi desenvolvido utilizando **TypeScript**, então certifique-se que você tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, clone o repositório na sua maquina:

```
git clone https://github.com/HMarcos/repo-provas
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Em seguida, com o arquivo **.env** configurado, rode os seguintes comandos para configurar o **Prisma** e a base de dados.

```
npx prisma migrate dev

npx prisma db seed

npx prisma generate
```

Finalizado o processo, é só inicializar o servidor
```
npm run dev
```

## Testes de Integração

Para rodar os testes de integração configure o arquivo `.env.test` com o banco de dados de teste, após isso rode o comando:

```
npm run test
```

## Testes com o Thunder Cliente

Para configurar os testes com o **Thunder Client** basta importar os arquivos: [thunder_client/thunder-collection_Repo Provas.json](thunder_client/thunder-collection_Repo Provas.json) (em *Collections*) e [thunder_client/thunder-environment_repoprovas.json](thunder_client/thunder-environment_repoprovas.json) (em *Env*);

Assim na aba *Env*, coloque a url do servido na variável `url`. Já as variáveis `token` é preenchida automaticamente durante as requisições de `sign-in`.




