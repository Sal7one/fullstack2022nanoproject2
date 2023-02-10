import OrderController, { Order, OrderProduct } from "../models/orders";
import { Product, ProductController } from "../models/products";
import { User, UserController } from "../models/users";

const userController = new UserController();
const productController = new ProductController();
const orderController = new OrderController();

beforeAll(async () => {
  const newUser1: User = {
    id: 0,
    firstname: "Saleh",
    lastname: "Alanazi",
    password: "123456789"
  };

  const newUser2: User = {
    id: 0,
    firstname: "Michle",
    lastname: "Jay",
    password: "123456789"
  };
  await userController.create(
    newUser1.firstname,
    newUser1.lastname,
    newUser1.password
    );

  await userController.create(
    newUser2.firstname,
    newUser2.lastname,
    newUser2.password
      );

  const prodcut1: Product = {
        id: 0,
        name: "Book About Movies",
        price: 200,
      };

      
  const prodcut2: Product = {
    id: 0,
    name: "Book About TV Shows",
    price: 250,
  };

 await productController.create(
  prodcut1.name,
  prodcut1.price);

  await productController.create(
    prodcut2.name,
    prodcut2.price);

      const order1: Order = {
        id: 0,
        userId: 1,
        status: "ACTIVE"
      };

      const order2: Order = {
        id: 0,
        userId: 1,
        status: "complete"
      };

      await orderController.create(
        order1.userId,
         order1.status
        );

      await orderController.create(
          order2.userId,
           order2.status
          );

      const orderProduct1: OrderProduct = {
            id: 0,
            prodcutId: 1,
            orderId: 1,
            prodcutQuantity: 15
          };

      const orderProduct2: OrderProduct = {
            id: 0,
            prodcutId: 1,
            orderId: 1,
            prodcutQuantity: 15
          };

        await orderController.addOrderProducts(
          orderProduct1.orderId,
          orderProduct1.prodcutId,
          orderProduct1.prodcutQuantity);

        await orderController.addOrderProducts(
          orderProduct2.orderId,
          orderProduct2.prodcutId,
          orderProduct2.prodcutQuantity);
});