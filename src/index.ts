import express from 'express';

import EventRouter from './router/EventRouter';
import UserRouter from './router/UserRouter';
import FavoriteRoute from './router/FavoriteRoute';

const app = express();
const port = 8080;

//compatibilidade
app.use(express.json());

//rotas
app.use('/', EventRouter);
app.use('/', UserRouter)
app.use('/', FavoriteRoute)

//subindo servidor
app.listen(port, () => {
    console.log('server: on-line'); 
})