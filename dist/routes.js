"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const requestLogger_1 = require("./middlewares/requestLogger");
const responseBuilder_1 = require("./middlewares/responseBuilder");
const ContactController_1 = __importDefault(require("./controllers/ContactController"));
const apiRouter = new koa_router_1.default({ prefix: '/api' });
apiRouter.use(responseBuilder_1.responseBuilder);
apiRouter.use(requestLogger_1.requestLogger);
apiRouter.get('/contacts', ContactController_1.default.getContacts);
apiRouter.get('/contacts/:id', ContactController_1.default.getContact);
apiRouter.post('/contacts', ContactController_1.default.createContact);
apiRouter.put('/contacts/:id', ContactController_1.default.updateContact);
exports.default = [apiRouter];
//# sourceMappingURL=routes.js.map