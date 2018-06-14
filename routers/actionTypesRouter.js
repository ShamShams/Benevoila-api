const { Router } = require('express');

const actionTypes = require('../controllers/actionTypes');

const router = new Router();

router.get('/', actionTypes.getAll);
router.post('/', actionTypes.createOne);
router.put('/:id', actionTypes.updateOne);

module.exports = router;
