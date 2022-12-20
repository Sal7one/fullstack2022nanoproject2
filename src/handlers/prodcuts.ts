
import express from 'express';

const createProduct= async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const query = req.query;
    const jsonErorr = { success: false, message: '' };
  }

  const showProduct = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const query = req.query;
    const jsonErorr = { success: false, message: '' };
  }
  
  const deleteProduct = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const query = req.query;
    const jsonErorr = { success: false, message: '' };
  }
  
  export {createProduct, showProduct, deleteProduct};