import express from 'express';
import usersRouter from "../handlers/users";
import productsRouter from "./products";
import ordersRouter from "./orders";

const router : express.Router = express.Router();

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

router.get('/', (req: express.Request, res: express.Response) => {
  res
  .status(200)
  .json({ message: "Try /users, /products /orders" });
});

const jsonErorr = { success: false, message: '404 Not Found' };
router.get('*', (req: express.Request, res: express.Response) => {
  res
  .status(404)
  .json(jsonErorr);
});

export default router;