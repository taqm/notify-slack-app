import express from 'express';
import morgan from 'morgan';

import { appConfig } from "./config";
import { Registry } from "./registory";
import { router } from './routers';
import { DBClientInfoRepository } from "./infra/DBClientInfoRepository";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(morgan('combined'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const registry: Registry = {
    appConfig,
    clientInfoRepository: new DBClientInfoRepository(),
  };
  Object.assign(req, { registry });
  next();
});

app.use(router);

app.listen(PORT);


