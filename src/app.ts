import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import routes from './routes/index'

const app: express.Application = express()
const port = 3000;
const address: string = `0.0.0.0:${port}`;

dotenv.config();
app.use(bodyParser.json())

app.use('/', routes);
app.listen(port, function () {
    console.log(`starting app on: ${address}`)
})
