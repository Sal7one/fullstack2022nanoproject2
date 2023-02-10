import supertest from 'supertest';
import app from '../../app';
import { 
  commonUser2,
  commonProduct2,
  commonOrder2
}from '../../tests/testSetup_spec';

const request = supertest(app);

describe('testing Orders endpoints', () => {
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
  });

  it('create order', async () => {
    const response = await request.post('/orders')
    .set('Authorization', `Bearer ${token}`)
    .send({userId: commonUser2.id});
    expect(response.body.order.id).toBeDefined();
  });

  
  it('show orders endpoint', async () => {
    const response = await request.get('/orders')
    .set('Authorization', `Bearer ${token}`)
    .send({userId: commonUser2.id});

    expect(response.body.orders).toBeDefined();

});

  it('create order product', async () => {
    const response = await request.post(`/orders/${commonOrder2.id}/products`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      productId: commonProduct2.id,
      quantity: "3"
  });
    expect(response.body.orderProduct).toBeDefined();
  });

  
  it('Get order product', async () => {
    const response = await request.get(`/orders/${commonOrder2.id}/products`)
    .set('Authorization', `Bearer ${token}`);
    expect(response.body.orderProducts).toBeDefined();
  });

});
