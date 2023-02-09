"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var orders_1 = __importDefault(require("../../src/models/orders"));
var orderController = new orders_1.default();
describe('testing order model', function () {
    it('checking existing of show (Current order by user) method', function () {
        expect(orderController.show).toBeDefined();
    });
    it('checking existing of updateOrderStatus method', function () {
        expect(orderController.updateOrderStat).toBeDefined();
    });
    it('checking existing of create method', function () {
        expect(orderController.create).toBeDefined();
    });
    it('checking existing of orderProducts method', function () {
        expect(orderController.orderProducts).toBeDefined();
    });
    it('checking existing of add order prodcuts method', function () {
        expect(orderController.addOrderProducts).toBeDefined();
    });
});
