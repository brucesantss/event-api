import express from 'express';

import UserRouter from './router/EventRouter';

const app = express();
const port = 8080;

//compatibilidade
app.use(express.json());

//rotas
app.use('/', UserRouter);

//subindo servidor
app.listen(port, () => {
    console.log('server: on-line'); 
})