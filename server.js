import dotenv from 'dotenv';
dotenv.load();

import express from 'express';
import cors from 'cors';
import { verifyToken } from './api/lib/authentication';
import routes from './api/routes';

import { port } from './config';

const app = express();

app.use(cors());
app.use(verifyToken);
app.use(routes);

app.listen(port, () => {
  console.log(`******** Server is running on port ${port} ********`);
});
