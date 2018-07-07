const mongoose = require('mongoose');
const config   = require('../config/config');
const Theory   = require('../models/theory');
const User     = require('../models/user');
const async    = require('async');


mongoose.connect(config.db, {
    useMongoClient: true,
});

async.waterfall([
    function clearCollections(done) {
        User.collection.drop();
        Theory.collection.drop();
        console.log('collections dropped')
        return done();
    },
    function createUsers(done) {
        User.create([
            {
                username: 'kay',
                password: 'password',
                passwordConfirmation: 'password',
            },
            {
                username: 'khaleesi',
                password: 'password',
                passwordConfirmation: 'password',
            }
        ], (err, users) => {
            if (err) return done(err);
            console.log(`${users.length} users were created`);
            return done(null, users);
        });
    },
    (user, done) => {
        Theory.create([
            {
                user: user[0]._id,                
                content: 'Cercei gives birth. To triplets. They look Braavosi. Jamie\'s uber pissed.',
                upvotes: 0,
            },
            {
                user: user[0]._id,                
                content: 'After Danny and Jon found out they\'re aunt/nephew they split up. Danny starts dating Tyrion only to later discover he\'s her long lost brother. Ooops.',
                upvotes: 0,
            },
            {
                user: user[1]._id,               
                content: 'Khal Drogo comes back to life and challenges Viserion to duel to avenge the Wall.',
                upvotes: 0,
            }
        ], (err, theories, users) => {
           if (err) {
             console.log('err', err);
             return done(err);
           }
           console.log(`${theories.length} theories created`);
           return done(null);
        });
    },
],
function finish(err) {
  if (err) {
    console.log('Error', err);
    return process.exit();
  } else {
    console.log('Done!');
    return process.exit();
  }
});