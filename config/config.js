const port = process.env.PORT || 3000;
const db = process.env.MONGODB_URI || 'mongodb://localhost/gottheories';

module.exports = {
    port,
    db
}