import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from "./handlers/users";
import productsRouter from "./handlers/prodcuts";
import ordersRouter from "./handlers/orders";
import cors from 'cors';

const app: express.Application = express();
const port = 3000;
const address = `localhost:${port}`;

const corsOptinos = {
  origin: 'localhost',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptinos));
app.use(bodyParser.json());

usersRouter(app)
productsRouter(app)
ordersRouter(app)

app.get('/', (req: express.Request, res: express.Response) => {
  res
  .status(200)
  .json({ message: "Try /users, /products /orders" });
});

const jsonErorr = { success: false, message: '404 Not Found' };
app.get('*', (req: express.Request, res: express.Response) => {
  res
  .status(404)
  .json(jsonErorr);
});


app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});
