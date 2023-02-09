import express from 'express';
import verifyAuthToken from '../handlers/auth';
import {Orders, OrderController} from '../models/orders';


const ordersRoutes = (app: express.Application) => {
    app.get("/orders/:id", verifyAuthToken, show);
};

const ordersController = new OrderController();

const show = async (
    req: express.Request,
    res: express.Response
) => {
};

export default ordersRoutes;