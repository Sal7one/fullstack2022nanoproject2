import client from "../database";

export type Order = {
  id: number;
  status: string;
  userId: number;
};

export type OrderProdcut = {
  Id: number;
  prodcutId: string;
  orderId: string;
  quantity: number;
};

export class OrderController {
  
  async index(): Promise<Order[]> {
    try {
      // Query And It's data
      const sql = "SELECT * FROM orders";

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql);

      // Result
      const order = result.rows;

      // Release
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Unable to fetch orders: ${err}`);
    }
  }

  async show(orderId: number, userId: number): Promise<Order | null> {
    try {
      // Query And It's data
      const orderData = [orderId, userId];
      const sql = "SELECT * FROM orders where id=$($1) and user_id=$($2)";

      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, orderData);

      // Result
      const order = result.rows[0];

      if(order === undefined)
      return null

      // Release
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Unable to fetch order (${orderId}, ${userId}): ${err}`);
    }
  }

}