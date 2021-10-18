import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import swaggerUi from "swagger-ui-express";

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import routes from '@shared/infra/http/routes';
import exceptionHandler from '@shared/infra/http/middlewares/exceptionHandler';

import '@shared/infra/typeorm';
import '@shared/container';

import swaggerDoc from "@shared/infra/documentation/swagger/swagger-output.json";

const app = express();

Sentry.init({
  dsn: "https://8633986b2c324cbf90e43f9f70943ade@o1043018.ingest.sentry.io/6012304",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use(routes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(Sentry.Handlers.errorHandler());

app.use(exceptionHandler);

app.listen(3030, () => {
  console.log('Server started on port: 3030');
});
