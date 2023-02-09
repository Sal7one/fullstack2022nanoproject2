"use strict";
// import supertest from 'supertest';
// import app from '../../app';
// const request = supertest(app);
// describe('testing Prodcuts endpoints', () => {
//      // Get token 
//      let token  = ""
//      beforeAll(async () => {
//        const response = await request
//          .post('/users')
//          .send({ firstname: 'Saleh', 
//           lastname: 'Alanazi', 
//           password: '123456789' });
//        if (response.body) {
//          token = response.body.token;
//        }
//        await request.post('/products')
//        .set('Authorization', `Bearer ${token}`)
//        .send({
//         name: 'A Book About playing guitar',
//         price: '50'
//       });
//      });
//   it('checking products index endpoint', async () => {
//     const response = await request
//       .get('/products')
//        expect(response.body).not.toBeUndefined();
//   });
//   it('show endpoint for product: 1', async () => {
//     const response = await request
//       .get('/products/1')
//     expect(response.body.id).toEqual(1);
//   });
//   it('create endpoint', async () => {
//     const response =     await request.post('/products')
//     .set('Authorization', `Bearer ${token}`)
//     .send({
//      name: 'A Book About playing piano',
//      price: '300'
//    });
//     // Added Database id as response
//     expect(response.body.id).toBeDefined();
//   });
// });
