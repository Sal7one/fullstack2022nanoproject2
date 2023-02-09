"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var constatns_1 = require("../utils/constatns");
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization || "null";
        var token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, constatns_1.JWT_SECRET);
        // Allowed
        next();
    }
    catch (error) {
        res.status(401);
        res.json("invalid token ".concat(error));
        return;
    }
};
exports.default = verifyAuthToken;
