import express from 'express';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../constatns'

const verifyAuthToken = (
req: express.Request,
res: express.Response,
next: express.NextFunction
): void => {
    try {
        const authorizationHeader = req.headers.authorization || "null"
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET as string)
        next()
    } catch (error) {
        res.status(401);
        res.json(`invalid token ${error}`);
        return
    }
}

export default verifyAuthToken