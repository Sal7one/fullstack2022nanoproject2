import express, { Request, Response } from 'express';

const productsRoute = express.Router();

productsRoute.get('/calc', (req: express.Request, res: express.Response): void => {

})

export default productsRoute;