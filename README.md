# Express.js Typescript API Tutorial

## Install

Install project dependencies

```shell
yarn
```

Create .env file with contents

```dotenv
DATABASE_URL="file:./dev.db"
PORT=3000
```

Prototype database schema

```shell
yarn prisma db push
```

Seed the database

```shell
yarn prisma db seed
```

## Serve

Serve project

```shell
yarn dev
```

## Features

- CRUD Author
- CRUD Book
