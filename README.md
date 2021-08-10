## Manga Rosa Application

### Requerimentos

- Node >= 14.16.1
- Npm >= 6.14.2
- Postgres >= 12.7 (Ubuntu)

### Frontend

#### Como rodar

- `npm install` ou `yarn`
- `npm start` ou `yarn start`

A aplicação será lançada na porta 3000

### Backend

#### Como rodar

Primeiro é necessário criar uma database no seu postgres

- `sudo -u postgres psql`
- `create database mangarosa`

Depois prosseguir com a instação dos pacotes necessários na aplicação

- `npm install` ou `yarn`
- `npm start` ou `yarn start`

E então rodar as migrations do typeorm, caso necessário alterar as credenciais e a porta do PSQL arquivo no caminho `backend/ormconfig.json`

- `npm typeorm migration:run` ou `yarn typeorm migration:run`

Finalmente rode a aplicação com `npm run dev` ou `yarn dev`

A Aplicação será lançada na porta 5000
