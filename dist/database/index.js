"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPool = exports.initDb = void 0;
const pg_1 = require("pg");
let pool;
function initDb(params) {
    pool = new pg_1.Pool(params);
}
exports.initDb = initDb;
function getPool() {
    if (!pool) {
        throw new Error("Database pool has not been initialized");
    }
    return pool;
}
exports.getPool = getPool;
//# sourceMappingURL=index.js.map