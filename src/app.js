import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());


import sugestaoController from './Controllers/sugestaoController.js';



sugestaoController.rotas(app);

export default app;