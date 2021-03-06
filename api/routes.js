import express from 'express';

import { authenticate } from './lib/authentication';
import users from './controllers/users';
import actionTypes from './controllers/actionTypes';
import actions from './controllers/actions';
import registrations from './controllers/registrations';

const router = new express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/authenticate', authenticate);

router.post('/users/register', users.createOne);
router.post('/users/login', users.login);
router.get('/users', users.getAll);
router.get('/users/admin', users.getAllAdmin);
router.get('/users/:id', users.getOne);
router.put('/users/:id', users.updateOne);
router.delete('/users/delete/:id', users.deleteOne);

router.post('/actionTypes/create', actionTypes.createOne);
router.get('/actionTypes', actionTypes.getAll);
router.get('/actionTypes/:id', actionTypes.getOne);
router.put('/actionTypes/:id', actionTypes.updateOne);
router.delete('/actionTypes/delete/:id', actionTypes.deleteOne);

router.post('/actions/create', actions.createOne);
router.get('/actions', actions.getAll);
router.get('/actions/:id', actions.getOne);
router.put('/actions/:id', actions.updateOne);
router.delete('/actions/delete/:id', actions.deleteOne);
router.get('/actionsWithType', actions.getAllWithType);

router.post('/registrations/create', registrations.createOne);
router.get('/registrations', registrations.getAll);
router.get('/registrations/user/:id', registrations.getAllByUser);
router.get('/registrations/action/:id', registrations.getAllByAction);
router.get('/registrations/:id', registrations.getOne);
router.delete('/registrations/delete/:id', registrations.deleteOne);

export default router;
