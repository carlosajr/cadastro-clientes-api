# Cadastro de Clientes

Esse repositório contém todos os arquivos referentes sistema de cadastro de clientes

## 📋 Pré-requisitos

Para conseguir fazer esse projeto rodar de modo 100% funcional na sua máquina,
você deve possuir os seguintes **requisitos**:

- [PostgreSQL](https://www.postgresql.org/download/) - Banco de Dados 💺
  - O link de download está disponível ao clicar no nome "PostgreSQL" acima.
- [NodeJS](https://nodejs.org/en/download/) - Back-end 👨‍💻
  - O link de download está disponível ao clicar no nome "NodeJS" acima.
  - A versão do NodeJS tem que ser no mínimo 10.18.0
- [YARN](https://yarnpkg.com/) - Gerenciador de Dependência 📥

## 🚀 Preparando A Aplicação

1 - Clone Este Repositório

2 - Abra o VS Code ou sua IDE de preferência e acesse a pasta do repositório

3 - Após isso, digite o seguinte comando para instalação dos pacotes da aplicação

```jsx
yarn install
```

4 - Ao finalizar a instalação, será necessário copiar o conteúdo do ormconfig.example.json, criar o arquivo ormconfig.json e colar as intruções dentro desse arquivo, logo após substitua as informações necessárias (type, host, port, username, password, database).

```json
{
  "type": "DIGITE_TYPE_AQUI",
  "host": "DIGITE_HOST_AQUI",
  "port": 0,
  "username": "DIGITE_USERNAME_AQUI",
  "password": "DIGITE_PASSWORD_AQUI",
  "database": "DIGITE_DATABASE_AQUI",
  "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
  "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
```

5 - Agora será necessário rodar as migrations, execute o seguinte comando:

```jsx
yarn typeorm migrations:run
```

6 - Neste passo podemos ir por dois caminhos, rodar em ambiente de DEV ou rodar em ambiente de PROD.

6.1 - Para rodar em ambiente de DEV basta executar o comando:

```jsx
yarn dev:server
```

6.2 - Para rodar em ambiente de PROD basta executar os comandos:

```jsx
yarn build
yarn prod:server
```
OBS: Deve-se tambem alterar o caminho das entities, migrations e migrationsDir no ormconfig.json
apontando para pasta `dist` e alterar as extensoes pasa `.js`.

Por fim, sua aplicação está pronta para uso, faça bom proveito ;)

## 📦 Desenvolvimento

Para o desenvolvimento desse projeto, foi utilizada a Stack PostgreSQL, Express e NodeJS,
Typescript, usando Autenticacao com JWT Tokens, tsyringe para injeção de dependência,
Sentry para Logar os Erros, Swagger para documentação e Jest para tests automatizados

## ✒️ Autor

- **Carlos André** - _Desenvolvedor Responsável_ - [Carlos André](https://github.com/carlosajr)
