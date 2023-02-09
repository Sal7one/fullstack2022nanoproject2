import express from 'express';
import verifyAuthToken from '../handlers/auth';
import {Products, prodcutsController} from '../models/products';


const productsRoutes = (app: express.Application) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products",verifyAuthToken , create);
};

const prodcutsController = new ProdcutsController();

const index = async (
    req: express.Request,
    res: express.Response
) => {
};

const show = async (
    req: express.Request,
    res: express.Response
) => {
};

const create = async (
    req: express.Request,
    res: express.Response
) => {
};

export default productsRoutes;