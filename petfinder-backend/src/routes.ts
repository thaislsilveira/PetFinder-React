import { Router } from 'express';
import multer from 'multer';

import { withJWTAuthMiddleware } from 'express-kun';

import authConfig from './config/auth';

import uploadConfig from './config/upload';

import SessionController from './controllers/SessionController';
import UsersController from './controllers/UsersController';
import PetsController from './controllers/PetsController';

import './database/connection';

const routes = Router();

const protectedRouter = withJWTAuthMiddleware(routes, authConfig.secret);

const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

protectedRouter.post('/users', UsersController.create);

protectedRouter.get('/pets', PetsController.index);
protectedRouter.get('/pets/:id', PetsController.show);
protectedRouter.post('/pets', upload.array('images'), PetsController.create);

export default routes;
