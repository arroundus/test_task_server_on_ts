"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.InvalidArgumentsError = void 0;
class InvalidArgumentsError extends Error {
    constructor(text) {
        super();
        this.message = `Некорректные аргументы: ${text}`;
    }
}
exports.InvalidArgumentsError = InvalidArgumentsError;
class AppError extends Error {
    constructor(text) {
        super();
        this.message = text;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=errors.js.map