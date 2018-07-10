const express = require('express');

const router = new express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const { actionTypes } = require('./controllers');

router.get('/actionTypes', actionTypes.getAll);
router.get('/actionTypes/:id', actionTypes.getOne);
router.post('/actionTypes', actionTypes.createOne);
router.put('/actionTypes/:id', actionTypes.updateOne);
router.delete('/actionTypes/:id', actionTypes.deleteOne);

module.exports = router;
