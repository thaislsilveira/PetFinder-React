import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import ensureAuthenticated from './middlewares/ensureAuthenticated';

import SessionController from './controllers/SessionController';
import UsersController from './controllers/UsersController';
import PetsController from './controllers/PetsController';

const routes = Router();

const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/users', UsersController.create);

routes.use('/pets', ensureAuthenticated);

routes.get('/pets', PetsController.index);
routes.get('/pets/:id', PetsController.show);
routes.post('/pets', upload.array('images'), PetsController.create);

export default routes;
