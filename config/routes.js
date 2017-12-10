const express  = require('express');
const router   = express.Router();
const theories = require('../controllers/theories');

router.route('/theories')
    .get(theories.index)
    .post(theories.create)

router.route('/theories/:id')
    .delete(theories.delete)

module.exports = router;