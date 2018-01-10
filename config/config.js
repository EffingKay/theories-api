const port = process.env.PORT || 8080;
const db = process.env.MONGODB_URI || 'mongodb://localhost/gottheories';
const secret = process.env.SECRET || 'Something very very secret...';

module.exports = {
    port,
    db,
    secret
}