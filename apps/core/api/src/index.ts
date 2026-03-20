import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from './config/env.js';
import deployRoutes from './routes/deploy.routes.js';
import { errorHandler } from './middlewares/error.handler.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', deployRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Hostra Scalable Core API!');
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`API server listening at http://localhost:${config.port}`);
});
