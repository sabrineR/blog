# API 

L' `API`:connected to the various interfaces (app , admin).

## Install tools


- Before installing API, make sure you have `Node` , `NPM`, `MySQL`, `Sequelize` installed on your machine.

- The Sequelize CLI

    ```bash
    npm install --save-dev sequelize-cli
    ```

## :wrench: Configuration

Configure the app

```sh
cp env.default .env
```

### : MySQL

To configure the 'MySQL' database, use [MySQLWorkBench](https://www.mysql.com/products/workbench/).

After following the instructions, create a new connection in 'MySQL Connections' on the MySQL Workbench home page, with the following configurations:
`Connection Name: blog-db`, `Username: root`, `Password: root`

Run db migration:

    ```bash
    sequelize db:migrate 
    ```

### :package: Package

Install all packages with

```sh
npm install
```

## :rocket: Usage

Go to the 'api' folder with

```sh
cd api
```

```sh
npm run dev
```

The API will open in [localhost:4000](https://localhost:4000/)

