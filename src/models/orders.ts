import client from "../database/database";
import {STATUS_ACTIVE} from "../utils/constatns"

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

export type OrderProduct = {
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
  
  async orderProducts(orderID: number): Promise<
  {Id: number,
  prodcutName: string,
  prodcutPrice: number,
  orderId: string,
  prodcutId: string,
  prodcutQuantity: number,
}[]> {
    try {
      // Query And It's data
      const orderData = [orderID];
      const sql =`SELECT p.name, p.price, op.order_id, op.product_id, op.product_quantity
      FROM order_products AS op
      INNER JOIN products as p ON p.id = op.product_id
      WHERE op.order_id = ($1)`;
      
      // Connection
      const conn = await client.connect();
      const result = await conn.query(sql, orderData);

      // Result
      const orderProduct = result.rows;

      // Release
      conn.release();

      return orderProduct;
    } catch (err) {
      throw new Error(`Unable to Fetch Order Products with Info: ${err}`);
    }
  }

  async addOrderProducts(orderId: number, prodcutId: number, prodcutQuantity: number): Promise<OrderProduct> {
    try {
       // Connection
        const conn = await client.connect();

        // Query And It's data
        const checkProductOrderData = [orderId, prodcutId];
        const CheckIfOrderProductExistsQuery =
        'SELECT * FROM order_products WHERE order_id = ($1) AND product_id = ($2) ' ;
        const existsResult = await conn.query(CheckIfOrderProductExistsQuery, checkProductOrderData);

        if(existsResult.rows[0]){
        
        // Exists we need to modify quantity
        const newQuantity = existsResult.rows[0].prodcutQuantity + prodcutQuantity;
        const orderProductId = existsResult.rows[0].id;

        // Query
        const updateQuantityData = [orderProductId, newQuantity];
        const updateQuantityDataQuery =
        'UPDATE order_products SET product_quantity= ($2) WHERE id= ($1) RETURNING *' ;

        const updateQuantityResult = await conn.query(updateQuantityDataQuery, updateQuantityData);

        conn.release();
        return updateQuantityResult.rows[0];
        }else{
          
        // Query And It's data
        const addNewOrderProductQuery =
        'INSERT INTO order_products (order_id, product_id, product_quantity)'
        + ' VALUES($1, $2, $3) RETURNING *';
        const newProductOrderData = [orderId, prodcutId, prodcutQuantity];

        // Connection
        const addOrderProductResult = await conn.query(addNewOrderProductQuery, newProductOrderData);

        conn.release();
        return addOrderProductResult.rows[0];
        }
        
    } catch (err) {
      throw new Error(
        `Could not add order product : ${err}`
      );
    }
  }
}




export default OrderController