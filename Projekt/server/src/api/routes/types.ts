import { Router } from 'express';
import { validateJsonWebToken } from '../controllers/authentication';
import { typeCreate, typeGet, typeUpdate, typeGetAll, typeDelete } from '../controllers/types';
import { param } from './util';

/** express.Router for path `/api/types` */
export const typesRoute: Router = Router();
typesRoute.param('id', param);

typesRoute.post('/', validateJsonWebToken, typeCreate);
typesRoute.get('/', validateJsonWebToken, typeGetAll);
typesRoute.get('/:id', validateJsonWebToken, typeGet);
typesRoute.patch('/:id', validateJsonWebToken, typeUpdate);
typesRoute.delete('/:id', validateJsonWebToken, typeDelete);