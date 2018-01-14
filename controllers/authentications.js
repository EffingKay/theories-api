const User   = require('../models/user');
const jwt    = require('jsonwebtoken');
const config = require('../config/config');

function authenticationsRegister(req, res){
    User.create(req.body, (err, user) => {
      if (err) {
        if (err.code === 11000) return res.status(401).json({errorMessage: 'Username is already taken.'});
        if (err.errors.password) return res.status(401).json({ errorMessage: err.errors.password.message});
        if (err.errors.passwordConfirmation) return res.status(401).json({ errorMessage: err.errors.passwordConfirmation.message});
        return res.status(500).json({ errorMessage: 'Something went wrong.' });
      } 
  
      const token = jwt.sign({ id: user.id, username: user.username }, config.secret, { expiresIn: 60*60*24*365 });
  
      return res.status(201).json({
        message: `Welcome ${user.username}!`,
        user,
        token
      });
    });
}
  
function authenticationsLogin(req, res){
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) return res.status(500).json({ errorMessage: 'Something went wrong.' });
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ errorMessage: 'Invalid username or password.' });
      }
  
      const token = jwt.sign({ id: user.id, username: user.username }, config.secret, { expiresIn: 60*60*24 });
  
      return res.status(200).json({
        message: 'Welcome back.',
        user,
        token
      });
    });
}

module.exports = {
    register: authenticationsRegister,
    login: authenticationsLogin
};