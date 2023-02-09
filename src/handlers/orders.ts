import express from 'express';
import verifyAuthToken from '../middlewares/auth';
import OrderController from '../models/orders';
import {STATUS_ACTIVE, STATUS_COMPLETE} from "../utils/constatns"

const STAT_TABLE = [STATUS_ACTIVE, STATUS_COMPLETE];

const ordersRoutes = (app: express.Application) => {
    app.post("/orders/", verifyAuthToken, create);
    app.get("/orders/:id", verifyAuthToken, show);
    app.put("/orders/:id", verifyAuthToken, updateOrderStatus);
};

const ordersController = new OrderController();

const show = async (
    req: express.Request,
    res: express.Response
) => {
    // Request Body
    let userReqId : string= req.query.userId as string;
    
    if(Number.isNaN(parseInt(userReqId))){
        res.status(400);
        res.json({error: "Bad Request: User Id should be a number"});
    }

    try {
        // Validate as required here
        const actualUserId : number =  parseInt(userReqId);

        // Search order by user
        const ordersByUser = ordersController.show(actualUserId);
        
        res.json({orders: ordersByUser});

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
    let userId : string = req.body.userId as string;
    
    if(Number.isNaN(parseInt(userId))){
        res.status(400);
        res.json({error: "Bad Request: User Id should be a number"});
    }

    try {
        // Validate as required here
        const actualUserId : number =  parseInt(userId);
        
        // Create Order
        const createdOrder = ordersController.create(actualUserId, STATUS_ACTIVE);
        res.json({order: createdOrder});

    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


const updateOrderStatus = async (
    req: express.Request,
    res: express.Response
) => {

    // Request Body
    let orderId : string = req.body.orderId as string;
    let status : string = req.body.status as string;
    
    if(Number.isNaN(parseInt(orderId))){
        res.status(400);
        res.json({error: "Bad Request: User Id should be a number"});
    }

    if(status.replace(/ /g, "").length == 0 ){
        res.status(400);
        res.json({error: "Bad Request: Status Can't be empty"});
    }

    // Validate as required here
    status = status.replace(/ /g, "");
    let indexOfStatus = STAT_TABLE.indexOf(status);
    if(indexOfStatus == -1 ){
        res.status(400);
        res.json({error: "Bad Request: Invalid Status"});
    }

    try {
        // Validate as required here
        const actualOrderId : number =  parseInt(orderId);
        const actualStatus : string =  STAT_TABLE[indexOfStatus];
        
        // Create Order
        const createdOrder = ordersController.updateOrderStat(actualOrderId, actualStatus);
        res.json({order: createdOrder});

    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

export default ordersRoutes;