import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);
import { 
  commonProduct1,
}from '../../testSetup_spec';

describe('testing Prodcuts endpoints', () => {



     // Get token 
     let token  = ""
     beforeAll(async () => {
       const response = await request
         .post('/users')
         .send({ firstname: 'Saleh', 
          lastname: 'Alanazi', 
          password: '123456789' });
       if (response.body) {
         token = response.body.token;
       }

       await request.post('/products')
       .set('Authorization', `Bearer ${token}`)
       .send({
        name: 'A Book About playing guitar',
        price: '50'
      });
   
     });

  it('checking products index endpoint', async () => {
    const response = await request
      .get('/products')
       expect(response.body).not.toBeUndefined();
  });

  it('show endpoint for product: 1', async () => {
    const response = await request
      .get(`/products/${commonProduct1.id}`)
    expect(response.body.product.name).toEqual(commonProduct1.name);
  });

  it('create endpoint', async () => {
    
    const response =     await request.post('/products')
    .set('Authorization', `Bearer ${token}`)
    .send({
     name: 'A Book About playing piano',
     price: '300'
   });
    // Added Database id as response
    expect(response.body.product.id).toBeDefined();
  });
});
