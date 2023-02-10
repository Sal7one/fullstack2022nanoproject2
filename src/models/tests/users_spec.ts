import { User, UserController } from '../users';

import { commonUser2 } from '../../tests/testSetup_spec';
const userController = new UserController();

describe('testing User model', () => {
  it('checking existing of show method', () => {
    expect(userController.show).toBeDefined();
  });

  it('checking existing of index method', () => {
    expect(userController.index).toBeDefined();
  });

  it('checking existing of create method', () => {
    expect(userController.create).toBeDefined();
  });

   
  it('Create on model user', async () => {
    const newUser: User = {
      id: 0,
      firstname: "Saleh",
      lastname: "Alanazi",
      password: "123456789"
    };

    const result = await userController.create(newUser.firstname, newUser.lastname, newUser.password);
    expect(result.firstname).toEqual(newUser.firstname);
  });

  it(`show method should get user`, async () => {
    const result = await userController.show(commonUser2.id);
    expect(result!!.firstname).toEqual(commonUser2.firstname);
  });

  
  it('index method should get user list', async () => {
    const result = await userController.index();
    expect(result).not.toEqual([]);
  });

});