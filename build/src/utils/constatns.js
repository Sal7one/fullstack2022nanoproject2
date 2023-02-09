"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_COMPLETE = exports.STATUS_ACTIVE = exports.PEPPER = exports.SALT_ROUNDS = exports.JWT_SECRET = exports.POSTGRES_PORT = exports.POSTGRES_PASS = exports.POSTGRES_USER = exports.POSTGRES_PROD_DB = exports.POSTGRES_TEST_DB = exports.POSTGRES_DB = exports.POSTGRES_HOST = exports.ENV = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENV = (_a = process.env, _a.ENV), exports.POSTGRES_HOST = _a.POSTGRES_HOST, exports.POSTGRES_DB = _a.POSTGRES_DB, exports.POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, exports.POSTGRES_PROD_DB = _a.POSTGRES_PROD_DB, exports.POSTGRES_USER = _a.POSTGRES_USER, exports.POSTGRES_PASS = _a.POSTGRES_PASS, exports.POSTGRES_PORT = _a.POSTGRES_PORT, exports.JWT_SECRET = _a.JWT_SECRET, exports.SALT_ROUNDS = _a.SALT_ROUNDS, exports.PEPPER = _a.PEPPER, exports.STATUS_ACTIVE = (_b = _a.STATUS_ACTIVE, _b === void 0 ? "ACTIVE" : _b), exports.STATUS_COMPLETE = (_c = _a.STATUS_COMPLETE, _c === void 0 ? "COMPLETE" : _c);
