import express, { Request, Response } from 'express';

const usersRoute = express.Router();

usersRoute.get('/calc', (req: express.Request, res: express.Response): void => {

})

export default usersRoute;