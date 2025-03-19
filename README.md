# 📊 To-Do List CRUD

Um projeto de uma lista de tarefas (To-Do List) com funcionalidades avançadas, desenvolvido utilizando **React** e **Node.js**, utilizando **TypeScript** como linguagem de programação.

## 📌 Visão geral

O **To-Do List CRUD**, é uma aplicação full-stack com funcionalidades simples e intuitivas de um CRUD para o gerenciamento de tarefas. Ele contem as seguintes funcionalidades:

- Criação e login de usuários com senha criptografada.
- Autenticação de usuário.
- Criação, listagem, atualização e exclusão de tarefas.
- Marcar e desmarcar tarefas como concluídas.

Além disso, o projeto inclui as seguintes funcionalidades técnicas:

- Autenticação utilizando **JWT**.
- **SQLServer** como banco de dados.
- **Prisma** como ORM para a integração com o banco de dados.
- **Nest.js** como framework Node.js para a construção da API.
- **Vite** como ferramenta de build para a construção do front-end com React.
- **Zod** para validação das informações.
- Princípios de clean-architecture (arquitetura limpa) para a construção do projeto. 

## 🏗️ Arquitetura

O projeto utiliza alguns conceitos de clean-architecture (arquitetura limpa)  dividido em camadas, seguindo o seguinte modelo:

![Image](https://github.com/user-attachments/assets/23cc4e4e-2335-402a-b45d-14ec4ccba2e3)

## 🔗 Endpoints
*OBS: Caso abra essa aplicação dentro do VSCode, recomendo usar a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). Dentro de `apps/api` existe um arquivo chamado `client.http` que pode ser usado para testar os endpoints da aplicação em ambiente de desenvolvimento.*

### `POST /users`
Endpoint usado para criar um novo usuário.

- Os campos `confirmPassoword` e `password` possuem uma validação de no mínimo 8 caracteres.

`Request(JSON):`
```json
{
  "confirmPassword": "123456",
  "password": "123456",
  "username": "John Doe"
}
```

`Response(JSON):`
```json
{
  "user": {
    "id": "ef10604b-22e4-4851-9fd7-f16abbe91023",
    "username": "John Doe"
  }
}
```

### `POST /auth`
Endpoint usado para autenticar um usuário cadastrado.

`Request(JSON):`
```json
{
  "password": "12345678",
  "username": "John Doe"
}
```

`Response(JSON):`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZjEwNjA0Yi0yMmU0LTQ4NTEtOWZkNy1mMTZhYmJlOTEwMjMiLCJpYXQiOjE3NDIzNTE5MTd9.G00wX6WE1WgfvBYFDnI1_AXeo0n0vR9HgT-_82rsgUA"
}
```

### `POST /tasks`
Endpoint usado para criar uma tarefa.

- Endpoint protegito pela autenticação JWT.
- Necessário passar `Authorization: Bearer {{access_token}}` no *headers* da chamada.

`Request(JSON):`
```json
{
  "description": "Simple description",
  "title": "Simple title"
}
```

`Response(JSON):`
```json
{
  "task": {
    "id": "6cf254f1-e6ae-4df7-a99d-77a27bd7a0ae",
    "title": "Simple title",
    "description": "Simple description",
    "status": false,
    "createdAt": "2025-03-15T03:00:00.786Z",
    "userId": "ef10604b-22e4-4851-9fd7-f16abbe91023"
  }
}
```

### `GET /tasks?page=x`
Endpoint usado para buscar as tarefas de um usuário.

- Endpoint protegito pela autenticação JWT.
- Necessário passar `Authorization: Bearer {{access_token}}` no *headers* da chamada.
- Esse endpoint aceita o *query param* `page` para paginação.

`Response(JSON):`
```json
{
  "metadata": {
    "count": 1
  },
  "tasks": [
    {
      "id": "6cf254f1-e6ae-4df7-a99d-77a27bd7a0ae",
      "title": "Simple title",
      "description": "Simple description",
      "status": false,
      "createdAt": "2025-03-15T03:00:00.786Z",
      "userId": "ef10604b-22e4-4851-9fd7-f16abbe91023"
    }
  ]
}
```

### `PUT /tasks/:taskId`
Endpoint usado para atualizar uma tarefa de um usuário.

- Endpoint protegito pela autenticação JWT.
- Necessário passar `Authorization: Bearer {{access_token}}` no *headers* da chamada.
- Para atualizar uma tarefa é necessário passar o `id` da tarefa como *route param*.
- Todos os campos são opcionais.

`Request(JSON):`
```json
{
  "description": "Updated simple description",
  "status": true,
  "title": "Updated simple Title"
}
```

`Response(JSON):`
```json
{
  "task": {
    "id": "6cf254f1-e6ae-4df7-a99d-77a27bd7a0ae",
    "title": "Updated simple Title",
    "description": "Updated simple description",
    "status": true,
    "createdAt": "2025-03-15T03:00:00.786Z",
    "userId": "ef10604b-22e4-4851-9fd7-f16abbe91023"
  }
}
```

### `DELETE /tasks/:taskId`
Endpoint usado para deletar uma tarefa de um usuário.

- Endpoint protegito pela autenticação JWT.
- Necessário passar `Authorization: Bearer {{access_token}}` no *headers* da chamada.
- Para deletar uma tarefa é necessário passar o `id` da tarefa como *route param*.

## 📋 Requisitos
- Docker
- Docker Compose
- Node.js >= v20.14

## ⚙️ Instalação
### 1.Clone o repositório
```bash
git clone https://github.com/JustSpica/advanced-to-do-list.git
cd advanced-to-do-list
```

### 2. Instalar as dependências
Na pasta raiz execute o seguinte comando:
```bash
pnpm install
```
ou
```bash
npm install 
```

### 3. Configuração do SQLServer

Entre na pasta da API para subir o contêiner Docker do SQLServer.
```bash
cd apps/api
```

Suba o Docker Compose:
```bash
docker compose up -d
```

O contêiner Docker usa a imagem `mcr.microsoft.com/mssql/server:2019-latest` do SQL Server, e a aplicação tentará se conectar com o banco de dados na porta `1433` onde `user=SA`, `password=Docker123@!` e `database=to_do_database`.

### 4. Conectando ao SQL Server
#### 4.1 Via linha de comando (`sqlcmd` dentro do contêiner)

A imagem do SQL Server fornece a ferramenta `sqlcmd` que pode ser usada dentro do contêiner para executar comandos T-SQL.
```bash
docker exec -it sqlserver bash
```

Dentro do contêiner, execute:
```bash
/opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "Docker123@!" -C -N -Q "CREATE DATABASE to_do_database"
```

Verificando se o banco de dados foi criado com sucesso:
```bash
/opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "Docker123@!" -C -N -Q "SELECT name FROM sys.databases"

# Retorno esperado:
name
----------------------------------
master
tempdb
model
msdb
to_do_database
```

#### 4.2 Conectando via uma ferramenta externa
Pode ser usado alguma ferramentas gráficas, como:

- Azure Data Studio
- SQL Server Management Studio
- DBeaver

Nas configurações de conexão, informe:

- Server/Host: `localhost`.
Port: `1433` (se você não alterou a porta).
Login: `SA`
Password: `Docker123@!`

Dentro de `apps/api` execute as migrations do Prisma:
```bash
npx prisma migrate dev
```

### 5. Execução da aplicação
#### 5.1 Subindo a API
Para subir a API, após todos os passos, basta executar a seguinte linha de comando dentro de `apps/api`:  

```bash
pnpm run start:dev
```
ou
```bash
npm run start:dev 
```
Por padrão a aplicação deve abrir na porta `3333`, mas isso pode ser configurado passando a variável ambiente `PORT` no arquivo `env` dentro de `apps/api`.

#### 5.2 Subindo o Front-end
Para subir o front-end em React, basta executar a seguinte linha de comando dentro de `apps/web`:

```bash
pnpm run dev
```
ou
```bash
npm run dev
```

*OBS: Os arquivos `.env` foram integrados ao repositório apenas para fins de praticidade. Em uma aplicação real esses arquivos seriam ignorados pelo git, configurando no `.gitignore`.*

## ⚡ Tecnologias
- TypeScript@v5.7.2
- Node.js@v20.14.0
- Nest.js@v11.0.0
- Prisma@v6.5.0
- React@v19.0.0
- Vite@v6.2.0
- Tailwindcss@v4.0.14