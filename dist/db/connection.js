"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
    path: `${__dirname}/../../.env.${ENV}`,
});
if (!process.env.PGDATABASE) {
    throw new Error("PGDATABASE not set");
}
const db = new pg_1.Pool();
exports.default = db;
