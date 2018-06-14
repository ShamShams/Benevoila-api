const { Router } = require('express');

const actionTypes = require('../controllers/actionTypes');

const router = new Router();

router.get('/', actionTypes.getAll);
router.post('/', actionTypes.createOne);

module.exports = router;
