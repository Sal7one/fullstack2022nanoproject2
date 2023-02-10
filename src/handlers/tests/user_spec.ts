import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);
import { 
  commonUser1,
}from '../../tests/testSetup_spec';

describe('testing User endpoints', () => {
  let token = '';
  beforeAll(async () => {

    const response = await request
      .post('/users')
      .send({ firstname: 'Saleh',  lastname: 'Alanazi', password: '123456789' });
    if (response.body) {
      token = response.body.token;
    }
  });

  it('checking users index endpoint', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
       expect(response.body).not.toBeUndefined();
  });

  it('show endpoint for user_id: 1', async () => {
    const response = await request
      .get(`/users/${commonUser1.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.user.firstname).toEqual(commonUser1.firstname);
  });

  it('create endpoint', async () => {
    const response = await request.post('/users').send({
      firstname: 'Nasser',
      lastname: 'Al Ahmedi',
      password: '55555',
    });
    expect(response.body.token).toBeDefined();
  });
});
