import express from 'express';
import verifyAuthToken from '../handlers/auth';
import {Product, ProductController} from '../models/products';


const productsRoutes = (app: express.Application) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products",verifyAuthToken , create);
};

const productController = new ProductController();

const index = async (
    req: express.Request,
    res: express.Response
) => {
    try {

        // Get All users
        const products = productController.index();
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
    let productName : string = req.body.name as string;
    let productPrice : string = req.body.price as string;
    
    if(Number.isNaN(parseInt(productPrice))){
        res.status(400);
        res.json({error: "Bad Request: Product Price should be a number"});
    }

    if(productName.replace(/ /g, "").length == 0 ){
        res.status(400);
        res.json({error: "Bad Request: Product Name Can't be empty"});
    }

    try {
        // Validate as required here
        productName =  productName.trim();
        const actualPrice : number =  parseInt(productName);
        
        // Create Product
        const createdProduct = productController.create(productName, actualPrice);
        res.json({product: createdProduct});

    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

export default productsRoutes;