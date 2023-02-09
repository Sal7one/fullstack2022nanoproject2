"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
var database_1 = __importDefault(require("../database/database"));
var constatns_1 = require("../utils/constatns");
var OrderController = /** @class */ (function () {
    function OrderController() {
    }
    OrderController.prototype.show = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, orderData, result, orders, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM orders WHERE user_id=($1)";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        orderData = [userId];
                        return [4 /*yield*/, conn.query(sql, orderData)];
                    case 2:
                        result = _a.sent();
                        orders = result.rows;
                        // Release
                        conn.release();
                        return [2 /*return*/, orders];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Unable to fetch orders: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.create = function (userId, status) {
        return __awaiter(this, void 0, void 0, function () {
            var orderData, sql, conn, result, order, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        orderData = [userId, constatns_1.STATUS_ACTIVE];
                        sql = "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, orderData)];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        // Release
                        conn.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Unable to Create Order with Info (".concat(userId, ", ").concat(status, "): ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.updateOrderStat = function (orderID, status) {
        return __awaiter(this, void 0, void 0, function () {
            var orderData, sql, conn, result, order, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        orderData = [orderID, status];
                        sql = "UPDATE orders SET status=($2) WHERE id=($1) RETURNING *";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, orderData)];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        // Release
                        conn.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Unable to UPDATE Order with Info (".concat(orderID, ", ").concat(status, "): ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.orderProducts = function (orderID) {
        return __awaiter(this, void 0, void 0, function () {
            var orderData, sql, conn, result, orderProduct, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        orderData = [orderID];
                        sql = "SELECT p.name, p.price, op.order_id, op.product_id, op.product_quantity\n      FROM order_products AS op\n      INNER JOIN products as p ON p.id = op.product_id\n      WHERE op.order_id = ($1)";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, orderData)];
                    case 2:
                        result = _a.sent();
                        orderProduct = result.rows;
                        // Release
                        conn.release();
                        return [2 /*return*/, orderProduct];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Unable to Fetch Order Products with Info: ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.addOrderProducts = function (orderId, prodcutId, prodcutQuantity) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, checkProductOrderData, CheckIfOrderProductExistsQuery, existsResult, newQuantity, orderProductId, updateQuantityData, updateQuantityDataQuery, updateQuantityResult, addNewOrderProductQuery, newProductOrderData, addOrderProductResult, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        checkProductOrderData = [orderId, prodcutId];
                        CheckIfOrderProductExistsQuery = 'SELECT * FROM order_products WHERE order_id =($1) AND product_id =($2) ';
                        return [4 /*yield*/, conn.query(CheckIfOrderProductExistsQuery, checkProductOrderData)];
                    case 2:
                        existsResult = _a.sent();
                        if (!existsResult.rows[0]) return [3 /*break*/, 4];
                        newQuantity = existsResult.rows[0]['product_quantity'] + prodcutQuantity;
                        orderProductId = existsResult.rows[0].id;
                        updateQuantityData = [orderProductId, newQuantity];
                        updateQuantityDataQuery = 'UPDATE order_products SET product_quantity=($2) WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, conn.query(updateQuantityDataQuery, updateQuantityData)];
                    case 3:
                        updateQuantityResult = _a.sent();
                        conn.release();
                        return [2 /*return*/, updateQuantityResult.rows[0]];
                    case 4:
                        addNewOrderProductQuery = 'INSERT INTO order_products (order_id, product_id, product_quantity)'
                            + ' VALUES($1, $2, $3) RETURNING *';
                        newProductOrderData = [orderId, prodcutId, prodcutQuantity];
                        return [4 /*yield*/, conn.query(addNewOrderProductQuery, newProductOrderData)];
                    case 5:
                        addOrderProductResult = _a.sent();
                        conn.release();
                        return [2 /*return*/, addOrderProductResult.rows[0]];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_5 = _a.sent();
                        throw new Error("Could not add order product : ".concat(err_5));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return OrderController;
}());
exports.OrderController = OrderController;
exports.default = OrderController;
