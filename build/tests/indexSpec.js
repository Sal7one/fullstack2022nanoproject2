"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
var app_1 = __importDefault(require("../src/app"));
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter({
    spec: {
        displayPending: true,
    },
}));
var request = (0, supertest_1.default)(app_1.default);
// describe('testing User endpoints', (): void => {
//   let token = '';
//   beforeAll(async () => {
//     const response = await request
//       .post('/users')
//       .send({ firstname: 'Saleh',  lastname: 'Alanazi', password: '123456789' });
//     if (response.body) {
//       token = response.body.token;
//     }
//   });
//   it('checking users index endpoint', async () => {
//     const response = await request
//       .get('/users')
//       .set('Authorization', `Bearer ${token}`);
//        expect(response.body).not.toBeUndefined();
//   });
//   it('show endpoint for user_id: 1', async () => {
//     const response = await request
//       .get('/users/1')
//       .set('Authorization', `Bearer ${token}`);
//     expect(response.body.id).toEqual(1);
//   });
//   it('create endpoint', async () => {
//     const response = await request.post('/users').send({
//       firstname: 'Nasser',
//       lastname: 'Al Ahmedi',
//       password: '55555',
//     });
//     expect(response.body.token).toBeDefined();
//   });
// });
