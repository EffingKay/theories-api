const mongoose = require('mongoose');

const theorySchema = mongoose.Schema({
    content: { type: String, trim: true, required: true },
    upvotes: { type: Number },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },    
}, {
    timestamps: true
});

theorySchema.set('toJSON', {
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
});

theorySchema.pre('save', function(done) {
    return this.model('User').findByIdAndUpdate(this.user, { $addToSet: { theories: this._id }}, done);
});

module.exports = mongoose.model('Theory', theorySchema);