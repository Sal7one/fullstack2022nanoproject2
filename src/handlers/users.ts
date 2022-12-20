
import express from 'express';

const createUser = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const query = req.query;
    const jsonErorr = { success: false, message: '' };
  }

  const showUser = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const query = req.query;
    const jsonErorr = { success: false, message: '' };
  }
  
  const deleteUser = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const query = req.query;
    const jsonErorr = { success: false, message: '' };
  }
  
  export {createUser, showUser, deleteUser};