"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseBuilder = void 0;
const errors_1 = require("../utils/errors");
// Middleware для построения ответа на запрос
const responseBuilder = async (ctx, next) => {
    try {
        await next();
        // Проверка на наличие ошибок
        if (!ctx.body) {
            ctx.throw(500, 'No response body');
        }
        // Установка статуса ответа
        ctx.status = 200;
        // Отправка JSON-ответа с данными
        ctx.body = { data: ctx.body };
    }
    catch (err) {
        let statusCode = 500;
        let errorMessage = 'unknown';
        if (err instanceof errors_1.InvalidArgumentsError || err instanceof errors_1.AppError) {
            statusCode = 400;
            errorMessage = err.message;
        }
        // Установка статуса ответа
        ctx.status = statusCode;
        // Отправка JSON-ответа с ошибкой
        ctx.body = { error: errorMessage };
    }
};
exports.responseBuilder = responseBuilder;
//# sourceMappingURL=responseBuilder.js.map