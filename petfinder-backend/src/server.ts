import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import 'express-async-errors';

import routes from './routes';
import errorHandler from './errors/handler';
import uploadsDir from './config/uploadsDir';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(uploadsDir));
app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT);
