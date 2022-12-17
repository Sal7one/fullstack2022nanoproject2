import express, { Request, Response } from 'express';

const usersRoute = express.Router();


// Token
usersRoute.get('/', (req: express.Request, res: express.Response): void => {
})

usersRoute.get('/show', (req: express.Request, res: express.Response): void => {
})

usersRoute.get('/create', (req: express.Request, res: express.Response): void => {
})

export default usersRoute;