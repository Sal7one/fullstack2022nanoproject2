import express, { Request, Response } from 'express';
import usersRouter from "./users";
import productsRouter from "./products";
import ordersRouter from "./orders";


const router : express.Router = express.Router();
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

const jsonErorr = { success: false, message: '404 Not Found' };
router.get('*', (req: express.Request, res: express.Response) => {
  res.status(404).json(jsonErorr);
});

export default router;