import express from 'express';
import verifyAuthToken from '../handlers/auth';
import {User, UserController} from '../models/users';


const usersRoutes = (app: express.Application) => {
    app.get("/users", verifyAuthToken, index);
    app.get("/users/:id",verifyAuthToken , show);
    app.post("/users",verifyAuthToken , create);
};

const userController = new UserController();

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

export default usersRoutes;