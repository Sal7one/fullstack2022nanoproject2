import OrderController, { Order, OrderProduct } from '../orders';

import { 
  commonUser2,
  commonOrder2,
  commonProduct2
 } from '../../tests/testSetup_spec';

const orderController = new OrderController();

describe('testing order model', () => {
  it('checking existing of show (Current order by user) method', () => {
    expect(orderController.show).toBeDefined();
  });

  it('checking existing of updateOrderStatus method', () => {
    expect(orderController.updateOrderStat).toBeDefined();
  });

  it('checking existing of create method', () => {
    expect(orderController.create).toBeDefined();
  });

  it('checking existing of orderProducts method', () => {
    expect(orderController.orderProducts).toBeDefined();
  });
  it('checking existing of add order prodcuts method', () => {
    expect(orderController.addOrderProducts).toBeDefined();
  });
     
  it('Create on model order', async () => {
    const newOrder: Order = {
      id: 0,
      userId: commonUser2.id,
      status: "ACTIVE"
    };

    const result = await orderController.create(newOrder.userId, newOrder.status);
    expect(result.id).not.toBeNull();
  });

  it(`show method should get order`, async () => {
    const result = await orderController.show(commonOrder2.id);
    expect(result).not.toBeNull();
  });

  it('addOrderProducts method should creete order prodcut list', async () => {
    const newOrderProduct: OrderProduct = {
      id: 0,
      prodcutId: commonProduct2.id,
      orderId: commonOrder2.id,
      prodcutQuantity: 8
    };
    const result = await orderController.addOrderProducts(
      newOrderProduct.orderId,
      newOrderProduct.prodcutId,
      newOrderProduct.prodcutQuantity
      );
    expect(result).toBeDefined();
  });

  
  it('orderProducts show order prodcut list', async () => {
    const result = await orderController.orderProducts(commonOrder2.id);
    expect(result).not.toBe([]);
  });

});