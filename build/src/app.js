"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var users_1 = __importDefault(require("./handlers/users"));
var prodcuts_1 = __importDefault(require("./handlers/prodcuts"));
var orders_1 = __importDefault(require("./handlers/orders"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var port = 3000;
var address = "localhost:".concat(port);
var corsOptinos = {
    origin: 'localhost',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptinos));
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json());
(0, users_1.default)(app);
(0, prodcuts_1.default)(app);
(0, orders_1.default)(app);
app.get('/', function (req, res) {
    res
        .status(200)
        .json({ message: "Try /users, /products /orders" });
});
var jsonErorr = { success: false, message: '404 Not Found' };
app.get('*', function (req, res) {
    res
        .status(404)
        .json(jsonErorr);
});
app.listen(port, function () {
    console.log("starting app on: ".concat(address));
});
exports.default = app;
