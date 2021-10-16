import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import routes from '@shared/infra/http/routes';
import exceptionHandler from '@shared/infra/http/middlewares/exceptionHandler';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());

app.use(routes);

app.use(exceptionHandler);

app.listen(3030, () => {
  console.log('Server started on port: 3030');
});
