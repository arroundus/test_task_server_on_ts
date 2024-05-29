"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, errors, printf, colorize } = winston_1.default.format;
const myFormat = printf((info) => {
    const { timestamp, label, level } = info;
    return `${timestamp} [${label}] ${level}: ${info.message}`;
});
const logger = winston_1.default.createLogger({
    level: 'debug',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), myFormat),
    transports: [new winston_1.default.transports.Console({ format: combine(colorize(), myFormat) })]
});
class Logger {
    constructor(label) {
        this.label = label;
        this.logger = logger;
    }
    error(message, error) {
        error && error instanceof Error && (message += `\n${error.stack}`);
        this.logger.log({
            level: 'error',
            message,
            label: this.label
        });
    }
    info(message) {
        this.logger.log({
            level: 'info',
            message,
            label: this.label
        });
    }
}
exports.appLogger = new Logger('app');
exports.default = Logger;
//# sourceMappingURL=Logger.js.map