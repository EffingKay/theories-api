const mongoose = require('mongoose');

const theorySchema = mongoose.Schema({
    content: { type: String, trim: true, required: true },
    upvotes: { type: Number },
});

module.exports = mongoose.model('Theory', theorySchema);