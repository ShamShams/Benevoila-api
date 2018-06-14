const { Router } = require('express');

const actionTypes = require('../controllers/actionTypes');

const router = new Router();

router.get('/', actionTypes.getAll);
router.get('/:id', actionTypes.getOne);
router.post('/', actionTypes.createOne);
router.put('/:id', actionTypes.updateOne);
router.delete('/:id', actionTypes.deleteOne);

module.exports = router;
