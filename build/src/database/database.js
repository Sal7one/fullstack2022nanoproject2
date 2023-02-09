"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var constatns_1 = require("../utils/constatns");
var client;
var PORT_NUMBER = parseInt(constatns_1.POSTGRES_PORT, 10) || 5432;
if (constatns_1.ENV === 'test') {
    client = new pg_1.Pool({
        host: constatns_1.POSTGRES_HOST,
        port: PORT_NUMBER,
        database: constatns_1.POSTGRES_TEST_DB,
        user: constatns_1.POSTGRES_USER,
        password: constatns_1.POSTGRES_PASS
    });
}
else if (constatns_1.ENV === 'prod') {
    client = new pg_1.Pool({
        host: constatns_1.POSTGRES_HOST,
        port: PORT_NUMBER,
        database: constatns_1.POSTGRES_PROD_DB,
        user: constatns_1.POSTGRES_USER,
        password: constatns_1.POSTGRES_PASS
    });
}
else {
    client = new pg_1.Pool({
        host: constatns_1.POSTGRES_HOST,
        port: PORT_NUMBER,
        database: constatns_1.POSTGRES_DB,
        user: constatns_1.POSTGRES_USER,
        password: constatns_1.POSTGRES_PASS
    });
}
exports.default = client;
