const express = require('express');

const router = new express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const { users, actionTypes, actions, registrations } = require('./controllers');

router.post('/users/register', users.createOne);
router.get('/users', users.getAll);
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
router.get('/registrations/:id', registrations.getOne);
router.delete('/registrations/delete/:id', registrations.deleteOne);

module.exports = router;
