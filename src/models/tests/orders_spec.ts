import OrderController, { Order, OrderProduct } from '../orders';

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
      userId: 1,
      status: "ACTIVE"
    };

    const result = await orderController.create(newOrder.userId, newOrder.status);
    expect(result.id).not.toBeNull();
  });

  it('show method should get user with id 1', async () => {
    const result = await orderController.show(1);
    expect(result).not.toBeNull();
  });

  
  const newOrderProduct: OrderProduct = {
    id: 0,
    prodcutId: 1.0,
    orderId: 1,
    prodcutQuantity: 15
  };

  it('addOrderProducts method should creete order prodcut list', async () => {
    const result = await orderController.addOrderProducts(newOrderProduct.orderId,
      newOrderProduct.prodcutId,newOrderProduct.prodcutQuantity);
    expect(result.id).toBeDefined();
  });

  
  it('orderProducts show order prodcut list', async () => {
    const result = await orderController.orderProducts(newOrderProduct.orderId);
    expect(result).not.toBe([]);
  });

});