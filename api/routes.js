const express = require('express');

const router = new express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const { users, actionTypes, actions } = require('./controllers');

router.get('/users', users.getAll);
router.get('/users/:id', users.getOne);
router.post('/users', users.createOne);
router.put('/users/:id', users.updateOne);
router.delete('/users/:id', users.deleteOne);

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

module.exports = router;
