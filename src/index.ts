import express from 'express';
import { router } from './router';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT);


