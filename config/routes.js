const express  = require('express');
const router   = express.Router();
const theories = require('../controllers/theories');
const users = require('../controllers/users');
const authentications = require('../controllers/authentications');

router.route('/theories')
    .get(theories.index)
    .post(theories.create)
router.route('/theories/:id')
    .get(theories.show)
    .delete(theories.delete)
    .patch(theories.update)
    .put(theories.update)

router.route('/register')
    .post(authentications.register)
router.route('/login')
    .post(authentications.login);
    
router.route('/users')
    .get(users.index)
    .post(users.create);
router.route('/users/:id')
    .get(users.show)
    .put(users.update)
    .patch(users.update)
    .delete(users.delete);
  
module.exports = router;