const express  = require('express');
const router   = express.Router();
const theories = require('../controllers/theories');

router.route('/theories')
    .get(theories.index)


module.exports = router;