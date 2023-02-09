import { ProductController} from '../products';

const productController = new ProductController();

describe('testing prodcuts model', () => {
  it('checking existing of show method', () => {
    expect(productController.show).toBeDefined();
  });

  it('checking existing of index method', () => {
    expect(productController.index).toBeDefined();
  });

  it('checking existing of create method', () => {
    expect(productController.create).toBeDefined();
  });
});