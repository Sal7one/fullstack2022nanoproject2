import express from 'express';
import verifyAuthToken from '../middlewares/auth';
import OrderController from '../models/orders';
import {STATUS_ACTIVE, STATUS_COMPLETE} from "../utils/constatns"

const STAT_TABLE = [STATUS_ACTIVE, STATUS_COMPLETE];

const ordersRoutes = (app: express.Application) => {
    app.post("/orders/", verifyAuthToken, create);
    app.get("/orders/", verifyAuthToken, show);
    app.put("/orders/:orderId", verifyAuthToken, updateOrderStatus);
    app.get("/orders/:id/products", verifyAuthToken, showOrderProdcuts);
    app.post("/orders/:id/products", verifyAuthToken, addProdcutsToOrder);
};

const ordersController = new OrderController();

const show = async (
    req: express.Request,
    res: express.Response
) => {
    // Request Body
    const userReqId : string = req.body.userId as string;
    
    if(Number.isNaN(parseInt(userReqId))){
        res.status(400);
        res.json({error: "Bad Request: User Id should be a number"});
        return;
    }

    try {
        // Validate as required here
        const actualUserId : number =  parseInt(userReqId);

        // Search order by user
        const ordersByUser = await ordersController.show(actualUserId);
        
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
        return;
    }

    try {
        // Validate as required here
        const actualUserId : number =  parseInt(userId);
        
        // Create Order
        const createdOrder = await ordersController.create(actualUserId, STATUS_ACTIVE);
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
    const orderId : string = req.params.orderId as string;
    let status : string = req.body.status as string;
    
    if(Number.isNaN(parseInt(orderId))){
        res.status(400);
        res.json({error: "Bad Request: Order Id should be a number"});
        return;
    }

    if( status == undefined ||
        status.replace(/ /g, "").length == 0 
        ){
        res.status(400);
        res.json({error: "Bad Request: Status Can't be empty"});
        return;
    }

    // Validate as required here
    status = status.replace(/ /g, "");
    const indexOfStatus = STAT_TABLE.indexOf(status);
    if(indexOfStatus == -1 ){
        res.status(400);
        res.json({error: "Bad Request: Invalid Status"});
        return;
    }

    try {
        // Validate as required here
        const actualOrderId : number =  parseInt(orderId);
        const actualStatus : string =  STAT_TABLE[indexOfStatus];
        
        // Update Order
        const updatedOrder = await ordersController.updateOrderStat(actualOrderId, actualStatus);

        if(updatedOrder == null)
            res.json({message: "No Order with this id"})
        else
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
    const orderId : string = req.params.id as string;
    
    if(Number.isNaN(parseInt(orderId))){
        res.status(400)
        .json({error: "Bad Request: Order Id should be a number"});
    }

    try {
        // Validate as required here
        const actualOrderId : number =  parseInt(orderId);
        //  Order
        const orderProducts = await ordersController.orderProducts(actualOrderId);
        res.json({orderProducts: orderProducts});

    } catch (error) {
        res.status(400)
        .json(error);
    }
};

const addProdcutsToOrder = async (
    req: express.Request,
    res: express.Response
) => {
    // Request Body
    const orderId : string = req.params.id as string;
    const productId : string = req.body.productId as string;
    const quantity : string = req.body.quantity as string;
    
    if(Number.isNaN(parseInt(orderId))){
        res.status(400)
        .json({error: "Bad Request: Order Id should be a number"});
        return;
    }

    if(Number.isNaN(parseInt(productId))){
            res.status(400)
            .json({error: "Bad Request: Product Id should be a number"});
            return;
        }
    
    if(Number.isNaN(parseInt(quantity))){
        res.status(400)
        .json({error: "Bad Request: Quantity should be a number"});
        return;
    }
    try {
        // Validate as required here
        const actualOrderId : number =  parseInt(orderId);
        const actualProductId : number =  parseInt(productId);
        const actualprodcutQuantity: number =  parseInt(quantity);

        //  Order Product
        const orderProduct = await ordersController.addOrderProducts(actualOrderId, actualProductId, actualprodcutQuantity);
        res.json({orderProduct: orderProduct});

    } catch (error) {
        res.status(400)
        .json(error);
    }
};

export default ordersRoutes;