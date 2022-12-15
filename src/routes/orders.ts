import express, { Request, Response } from 'express';

const ordersRoute = express.Router();

ordersRoute.get('/calc', (req: express.Request, res: express.Response): void => {

})

export default ordersRoute;