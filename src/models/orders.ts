import client from "../database/database";
import {STATUS_ACTIVE, STATUS_COMPLETE} from "../utils/constatns"

// Status idealy should be in a Lookup Table
// With a static value but since that is not required we're gonna ignore it
// Constant Values work too as a demo
// CONST STATUS_COMPLETED = "COMPLETED"
// CONST STATUS_ACTIVE = "ACTIVE"
// const STAT_TABLE = [STATUS_ACTIVE, STATUS_COMPLETE];
export type Order = {
  id: number;
  status: string;
  userId: number;
};

export type OrderProdcut = {
  Id: number;
  prodcutId: string;
  orderId: string;
  prodcutQuantity: number;
};

export class OrderController {

  async show(userId: number): Promise<Order[]> {
    try {
      // Query And It's data
      const sql = "SELECT * FROM orders WHERE user_id=($1)";

      // Connection
      const conn = await client.connect();

      const orderData = [userId];
      const result = await conn.query(sql, orderData);

      // Result
      const orders = result.rows;

      // Release
      conn.release();

      return orders;
    } catch (err) {
      throw new Error(`Unable to fetch orders: ${err}`);
    }
  }

  // async show(orderId: number, userId: number): Promise<Order | null> {
  //   try {
  //     // Query And It's data
  //     const orderData = [orderId, userId];
  //     const sql = "SELECT * FROM orders where id=$($1) and user_id=$($2)";

  //     // Connection
  //     const conn = await client.connect();
  //     const result = await conn.query(sql, orderData);

  //     // Result
  //     const order = result.rows[0];

  //     if(order === undefined)
  //     return null

  //     // Release
  //     conn.release();

  //     return order;
  //   } catch (err) {
  //     throw new Error(`Unable to fetch order (${orderId}, ${userId}): ${err}`);
  //   }
  // }

  async create(userId: number, status: string): Promise<Order> {
    try {

      // Query And It's data
      const orderData = [userId, STATUS_ACTIVE];
      const sql ="INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
      
      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, orderData);

      // Result
      const order = result.rows[0];

      // Release
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Unable to Create Order with Info (${userId}, ${status}): ${err}`);
    }
  }

  
  async updateOrderStat(orderID: number, status: string): Promise<Order> {
    try {

      // Query And It's data
      const orderData = [orderID, status];
      const sql ="UPDATE orders SET status = $2 WHERE id=$1 RETURNING *";
      
      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, orderData);

      // Result
      const order = result.rows[0];

      // Release
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Unable to Create Order with Info (${orderID}, ${status}): ${err}`);
    }
  }
}

export default OrderController