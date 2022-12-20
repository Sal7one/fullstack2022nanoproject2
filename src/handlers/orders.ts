
import express from 'express';

const createOrder = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const query = req.query;
    const jsonErorr = { success: false, message: '' };
  }

  const showOrder = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const query = req.query;
    const jsonErorr = { success: false, message: '' };
  }
  
  const deleteOrder = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const query = req.query;
    const jsonErorr = { success: false, message: '' };
  }
  
  export {createOrder, showOrder, deleteOrder};