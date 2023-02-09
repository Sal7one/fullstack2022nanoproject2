import express from 'express';
import verifyAuthToken from '../middlewares/auth';
import {JWT_SECRET} from '../utils/constatns';
import jwt from 'jsonwebtoken';
import {UserController} from '../models/users';


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
    try {
        // Get All users
        const users = userController.index();
        res.json({users: users});

    } catch (error) {
        res.status(400);
        res.json(error);
    }

};

const show = async (
    req: express.Request,
    res: express.Response
) => {
    
    // Request Body
    const userReqId : string= req.query.userId as string
    
    if(Number.isNaN(parseInt(userReqId))){
        res.status(400);
        res.json({error: "Bad Request: User Id should be a number"});
    }

    try {
        // Validate as required here
        const idWithoutSpaces : string = userReqId.replace(/ /g, "");
        const userId : number = parseInt(idWithoutSpaces);

        // Search user
        const foundUser = userController.show(userId);

        if(foundUser != null)
            res.json({user: foundUser});
        else
            res.json({message: "User does not exist"});

    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (
    req: express.Request,
    res: express.Response
) => {

    // Request Body
    let firstName : string= req.body.firstname as string;
    let lastName : string= req.body.firstname as string;
    let password : string= req.body.password as string;

    try {
        // Validate as required here
        firstName = firstName.trim().replace(/ /g, "");
        lastName =  lastName.replace(/ /g, "");
        password =  password.replace(/ /g, "");
        
        // Create user
        const createdUser = userController.create(firstName, lastName, password);
        const token = jwt.sign({user: createdUser}, JWT_SECRET as string);
        console.log(token);
        res.json(token);

    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

export default usersRoutes;