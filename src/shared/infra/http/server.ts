import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import routes from './routes';

import '../typeorm';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', async (request, response) => {
  return response.json({ message: 'Hello World Porra!' });
});

app.listen(3333, () => {
  console.log('👨‍⚖️️ Server started on port 3333');
});
