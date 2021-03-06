const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
   username: { type: String, trim: true, required: true, unique: true },
   passwordHash: { type: String, unique: true, required: true },
   theories: [{ type: mongoose.Schema.ObjectId, ref: 'Theory' }],
   liked: [{type: mongoose.Schema.ObjectId, ref: 'Theory'}]
});

userSchema
    .virtual('password')
    .set(setPassword);

userSchema
    .virtual('passwordConfirmation')
    .set(setPasswordConfirmation);

userSchema
    .path('passwordHash')
    .validate(validatePasswordHash);

userSchema.methods.validatePassword = validatePassword;

userSchema.set('toJSON', {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.__v;
      return ret;
    }
});
  
module.exports = mongoose.model('User', userSchema);

function setPassword(value) {
    this._password = value;
    const salt = bcrypt.genSaltSync(8);
    this.passwordHash = bcrypt.hashSync(value, salt);
}

function setPasswordConfirmation(value) {
    this._passwordConfirmation = value;
}

function validatePasswordHash() {
    if (this.isNew) {
        if (!this._password) {
            return this.invalidate('password', 'A password is required.');
        } 
        if (this._password.length < 6) {
            this.invalidate('password', 'Password must be at least 6 characters.');
        }
        if (this._password !== this._passwordConfirmation) {
            return this.invalidate('passwordConfirmation', 'Passwords do not match.');
        }
    }
}

function validatePassword(password){
    return bcrypt.compareSync(password, this.passwordHash);
  }

