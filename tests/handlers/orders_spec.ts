// import supertest from 'supertest';
// import app from '../../app';

// const request = supertest(app);

// describe('testing Orders endpoints', () => {
//   let token  = ""
//   beforeAll(async () => {

//     const response = await request
//       .post('/users')
//       .send({ firstname: 'Saleh', 
//        lastname: 'Alanazi', 
//        password: '123456789' });
//     if (response.body) {
//       token = response.body.token;
//     }

//   });


//   it('create order', async () => {
//     const response = await request.post('/orders')
//     .set('Authorization', `Bearer ${token}`)
//     .send({userId: '1'});
//     expect(response.body.id).toBeDefined();
//   });

  
//   it('show orders endpoint', async () => {
//     const response = await request.get('/orders')
//     .set('Authorization', `Bearer ${token}`)
//     .send({userId: '2'});
//     expect(response.body.id).toBeDefined();
// });

//   it('create order product', async () => {
//     const response = await request.post('/orders/1/products')
//     .set('Authorization', `Bearer ${token}`)
//     .send({
//       productId: "2",
//       quantity: "3"
//   });
//     expect(response.body.id).toBeDefined();
//   });

  
//   it('get order product', async () => {
//     const response = await request.get('/orders/1/products')
//     .set('Authorization', `Bearer ${token}`);
//     expect(response.body.id).toBeDefined();
//   });

// });
