const express = require('express');

const router = new express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const { users, auth, actionTypes, actions, registrations } = require('./controllers');

router.get('/users', users.getAll);
router.get('/users/:id', users.getOne);
router.post('/users', users.createOne);
router.put('/users/:id', users.updateOne);
router.delete('/users/:id', users.deleteOne);

router.post('/register', auth.register);
router.post('/login', auth.login);

router.get('/actionTypes', actionTypes.getAll);
router.get('/actionTypes/:id', actionTypes.getOne);
router.post('/actionTypes', actionTypes.createOne);
router.put('/actionTypes/:id', actionTypes.updateOne);
router.delete('/actionTypes/:id', actionTypes.deleteOne);

router.get('/actions', actions.getAll);
router.get('/actions/:id', actions.getOne);
router.post('/actions', actions.createOne);
router.put('/actions/:id', actions.updateOne);
router.delete('/actions/:id', actions.deleteOne);
router.get('/actionsWithType', actions.getAllWithType);

router.get('/registrations', registrations.getAll);
router.get('/registrations/:id', registrations.getOne);
router.post('/registrations', registrations.createOne);
router.delete('/registrations/:id', registrations.deleteOne);

module.exports = router;
