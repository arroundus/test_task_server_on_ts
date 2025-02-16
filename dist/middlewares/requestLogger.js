"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBody = exports.requestLogger = void 0;
const Logger_1 = __importDefault(require("../utils/Logger"));
const logger = new Logger_1.default('request');
const requestLogger = async (ctx, next) => {
    const start = Date.now();
    const method = ctx.method.padEnd(6, ' ');
    const url = ctx.url.padEnd(20, ' ');
    return await next()
        .then(() => {
        logger.info(`${method} ${url} - ${buildBody(ctx.request.body)} - ${getMs(start)} ms - ${ctx.status} - ${buildBody(ctx.response.body, 100)}`);
    })
        .catch(err => {
        const errString = `${method} ${url} - ${buildBody(ctx.request.body)} - ${getMs(start)} ms - ${err.status} - ${err.message}`;
        logger.error(errString, err);
        ctx.throw(err);
    });
};
exports.requestLogger = requestLogger;
function getMs(start) {
    let ms = (Date.now() - start).toString();
    ms = ms.length > 3 ? ms : ms.padStart(3);
    return ms;
}
function buildBody(body, maxLength = 0) {
    let result = body ? JSON.stringify(body) : '';
    if (maxLength !== 0) {
        result.length > maxLength - 3
            ? result = result.slice(0, maxLength - 3).concat('...')
            : result = result.padEnd(maxLength, ' ');
    }
    return result;
}
exports.buildBody = buildBody;
//# sourceMappingURL=requestLogger.js.map