import express from 'express';
import verifyAuthToken from '../middlewares/auth';
import OrderController from '../models/orders';
import {STATUS_ACTIVE, STATUS_COMPLETE} from "../utils/constatns"

const STAT_TABLE = [STATUS_ACTIVE, STATUS_COMPLETE];

const ordersRoutes = (app: express.Application) => {
    app.post("/orders/", verifyAuthToken, create);
    app.get("/orders/:id", verifyAuthToken, show);
    app.put("/orders/:id", verifyAuthToken, updateOrderStatus);
    app.get("/orders/:id/products", verifyAuthToken, showOrderProdcuts);
    app.post("/orders/:id/products", verifyAuthToken, addProdcutsToOrder);
};

const ordersController = new OrderController();

const show = async (
    req: express.Request,
    res: express.Response
) => {
    // Request Body
    const userReqId : string = req.query.userId as string;
    
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
    const userId : string = req.body.userId as string;
    
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
    const orderId : string = req.body.orderId as string;
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
    const indexOfStatus = STAT_TABLE.indexOf(status);
    if(indexOfStatus == -1 ){
        res.status(400);
        res.json({error: "Bad Request: Invalid Status"});
    }

    try {
        // Validate as required here
        const actualOrderId : number =  parseInt(orderId);
        const actualStatus : string =  STAT_TABLE[indexOfStatus];
        
        // Update Order
        const updatedOrder = ordersController.updateOrderStat(actualOrderId, actualStatus);
        res.json({order: updatedOrder});

    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const showOrderProdcuts = async (
    req: express.Request,
    res: express.Response
) => {
    // Request Body
    const orderId : string = req.query.orderId as string;
    
    if(Number.isNaN(parseInt(orderId))){
        res.status(400);
        res.json({error: "Bad Request: Order Id should be a number"});
    }

    try {
        // Validate as required here
        const actualOrderId : number =  parseInt(orderId);
        //  Order
        const orderProducts = ordersController.orderProducts(actualOrderId);
        res.json({orderProducts: orderProducts});

    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const addProdcutsToOrder = async (
    req: express.Request,
    res: express.Response
) => {
    // Request Body
    const orderId : string = req.query.orderId as string;
    const productId : string = req.body.productId as string;
    const quantity : string = req.body.quantity as string;
    
    if(Number.isNaN(parseInt(orderId))){
        res.status(400);
        res.json({error: "Bad Request: Order Id should be a number"});
    }

    if(Number.isNaN(parseInt(productId))){
            res.status(400);
            res.json({error: "Bad Request: Product Id should be a number"});
        }
    
    if(Number.isNaN(parseInt(quantity))){
        res.status(400);
        res.json({error: "Bad Request: Quantity should be a number"});
    }
    try {
        // Validate as required here
        const actualOrderId : number =  parseInt(orderId);
        const actualProductId : number =  parseInt(productId);
        const actualprodcutQuantity: number =  parseInt(quantity);

        //  Order Product
        const orderProduct = ordersController.addOrderProducts(actualOrderId, actualProductId, actualprodcutQuantity);
        res.json({orderProduct: orderProduct});

    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

export default ordersRoutes;