"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routes"));
const koa_body_1 = __importDefault(require("koa-body"));
const Logger_1 = require("./utils/Logger");
const database_1 = require("./database");
const Contact_1 = require("./models/Contact");
(0, database_1.initDb)({
    "host": "127.0.0.1",
    "user": "backend",
    "database": "backend"
});
Contact_1.Contact.pool = (0, database_1.getPool)();
const port = 5000;
const koa = new koa_1.default();
const server = http_1.default.createServer({}, koa.callback());
koa.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Credentials', 'true');
    await next();
});
koa.use((0, koa_body_1.default)({ multipart: true }));
for (const router of routes_1.default) {
    koa
        .use(router.routes())
        .use(router.allowedMethods());
}
server.on('error', (e) => { Logger_1.appLogger.error('Ошибка сервера', e); });
server.listen(port);
Logger_1.appLogger.info(`Сервер запущен и прослушивает запросы на порт ${port} `);
//# sourceMappingURL=index.js.map