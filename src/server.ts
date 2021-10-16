import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import routes from './routes';
import exceptionHandler from './middlewares/exceptionHandler';
import './database';

const app = express();

app.use(express.json());

app.use(routes);

app.use(exceptionHandler);

app.listen(3030, () => {
  console.log('Server started on port: 3030');
});
