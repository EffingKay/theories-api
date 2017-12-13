const port = process.env.PORT || 8080;
const db = process.env.MONGODB_URI || 'mongodb://localhost/gottheories';

module.exports = {
    port,
    db
}