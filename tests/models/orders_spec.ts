import OrderController from '../../src/models/orders';

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
});