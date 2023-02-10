import { ProductController, Product} from '../products';

import { 
  commonProduct2
 } from '../../tests/testSetup_spec';

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

  it(`show method should get product `, async () => {
    const result = await productController.show(commonProduct2.id);
    expect(result?.id).toEqual(commonProduct2.id);
  });

  it('index method should get products list', async () => {
    const result = await productController.index();
    expect(result).not.toEqual([]);
  });

});