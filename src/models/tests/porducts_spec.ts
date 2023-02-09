import { ProductController, Product} from '../products';

const productController = new ProductController();

describe('Testing Prodcuts model', () => {
  it('checking existing of show method', () => {
    expect(productController.show).toBeDefined();
  });

  it('checking existing of index method', () => {
    expect(productController.index).toBeDefined();
  });

  it('checking existing of create method', () => {
    expect(productController.create).toBeDefined();
  });

  
  it('Create on model product', async () => {
    const newItem: Product = {
      id: 0,
      name: "Book About Space",
      price: 180,
    };

    const result = await productController.create(newItem.name, newItem.price);
    expect(result.name).toEqual(newItem.name);
  });

  it('show method should get product with id 1', async () => {
    const result = await productController.show(1);
    expect(result!!.id).toEqual(1);
  });

  it('index method should get products list', async () => {
    const result = await productController.index();
    expect(result).not.toEqual([]);
  });

});