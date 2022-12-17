import express, { Request, Response } from 'express';

const productsRoute = express.Router();

// Token
productsRoute.get('/', (req: express.Request, res: express.Response): void => {
})

productsRoute.get('/show', (req: express.Request, res: express.Response): void => {
})

productsRoute.get('/create', (req: express.Request, res: express.Response): void => {
})

export default productsRoute;