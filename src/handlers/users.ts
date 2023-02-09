import express from 'express';
import verifyAuthToken from '../middlewares/auth';
import {JWT_SECRET} from '../utils/constatns';
import jwt from 'jsonwebtoken';
import {UserController} from '../models/users';

const usersRoutes = (app: express.Application) => {
    app.get("/users", verifyAuthToken, index);
    app.get("/users/:userId", verifyAuthToken , show);
    app.post("/users", create);
};

const userController = new UserController();

const index = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // Get All users
        const users = await userController.index();
        res.json({users: users});

    } catch (error) {
        res.status(400)
        .json(error);
    }

};

const show = async (
    req: express.Request,
    res: express.Response
) => {
    
    // Request Body
    const userReqId : string = req.params.userId as string
    
    if(Number.isNaN(parseInt(userReqId))){
        res.status(400)
        .json({error: "Bad Request: User Id should be a number"});
        return;
    }

    try {
        // Validate as required here
        const idWithoutSpaces : string = userReqId.replace(/ /g, "");
        const userId : number = parseInt(idWithoutSpaces);

        // Search user
        const foundUser = await userController.show(userId);

        if(foundUser != null)
            res.json({user: foundUser});
        else
            res.json({message: "User does not exist"});

    } catch (error) {
        res.status(400)
        .json(error);
    }
};

const create = async (
    req: express.Request,
    res: express.Response
) => {

    // Request Body
    let firstName : string = req.body.firstname as string;
    let lastName : string = req.body.lastname as string;
    let password : string = req.body.password as string;

    if(firstName == undefined ||
    firstName.replace(/ /g, "").length == 0
    ){
        res.status(400)
        .json({error: "Bad Request: First Name Can't be empty"});
        return;
    }

    if( 
        lastName == undefined ||
        lastName.replace(/ /g, "").length == 0 
    ){
        res.status(400)
        .json({error: "Bad Request: Last Name Can't be empty"});
        return;
    }

    if(
     password == undefined ||
     password.replace(/ /g, "").length == 0 
     ){
        res.status(400)
        .json({error: "Bad Request: Password Can't be empty"});
        return;
    }

    try {
        // Validate as required here
        firstName = firstName.trim().replace(/ /g, "");
        lastName =  lastName.replace(/ /g, "");
        password =  password.replace(/ /g, "");
        
        // Create user
        const createdUser = await userController.create(firstName, lastName, password);
        const token = jwt.sign({user: createdUser}, JWT_SECRET as string);
        res.status(200)
        .json({token: token});

    } catch (error) {
        res.status(400)
        .json(error);
    }
};

export default usersRoutes;