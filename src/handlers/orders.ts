import express from 'express';
import verifyAuthToken from '../middlewares/auth';
import {STAT_TABLE, OrderController} from '../models/orders';


const ordersRoutes = (app: express.Application) => {
    app.get("/orders/:id", verifyAuthToken, show);
    app.post("/orders/", verifyAuthToken, create);
};

const ordersController = new OrderController();

const index = async (
    req: express.Request,
    res: express.Response
) => {
    try {

        // Get All users
        const products = ordersController.index();
        res.json({products: products});

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
    let productReqId : string= req.query.productid as string;
    
    if(Number.isNaN(parseInt(productReqId))){
        res.status(400);
        res.json({error: "Bad Request: Product Id should be a number"});
    }

    try {
        // Validate as required here
        const idWithoutSpaces : string = productReqId.replace(/ /g, "");
        let productId : number = parseInt(idWithoutSpaces);

        // Search user
        const foundProduct = productController.show(productId);

        if(foundProduct != null)
            res.json({product: foundProduct});
        else
            res.json({message: "Product Does not exist"});

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
    let status : string = req.body.status as string;
    
    if(Number.isNaN(parseInt(userId))){
        res.status(400);
        res.json({error: "Bad Request: User Id should be a number"});
    }

    if(status.replace(/ /g, "").length == 0 ){
        res.status(400);
        res.json({error: "Bad Request: Status Can't be empty"});
    }
    

    // Validate as required here
    status = status.replace(/ /g, "");

    if(STAT_TABLE.indexOf(status) == -1 ){
        res.status(400);
        res.json({error: "Bad Request: Invalid Status"});
    }

    try {
        // Validate as required here
        const actualUserId : number =  parseInt(userId);
        
        // Create Order
        const createdOrder = ordersController.create(actualUserId, status);
        res.json({order: createdOrder});

    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


export default ordersRoutes;