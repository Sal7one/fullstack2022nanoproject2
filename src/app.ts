import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import cors from 'cors';

const app: express.Application = express();
const port = 3000;
const address: string = `localhost:${port}`;

const corsOptinos = {
  origin: 'localhost',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptinos));
app.use(bodyParser.json());

app.use('/', routes);
app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});
