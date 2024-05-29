import Router from 'koa-router';
import { requestLogger } from './middlewares/requestLogger';
import { responseBuilder } from './middlewares/responseBuilder';
import ContactController from './controllers/ContactController';

const apiRouter = new Router({ prefix: '/api' });

apiRouter.use(responseBuilder);
apiRouter.use(requestLogger);

apiRouter.get('/contacts', ContactController.getContacts);
apiRouter.get('/contacts/:id', ContactController.getContact);
apiRouter.post('/contacts', ContactController.createContact);
apiRouter.put('/contacts/:id', ContactController.updateContact);

export default [apiRouter];