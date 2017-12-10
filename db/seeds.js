const mongoose = require('mongoose');
const config   = require('../config/config');
const Theory   = require('../models/theory');
const async    = require('async');


mongoose.connect(config.db, {
    useMongoClient: true,
});

async.waterfall([
    function clearCollections(done) {
        Theory.collection.drop();
        console.log('collections dropped')
        return done();
    },
    function createCandidates(done) {
        Theory.create([
            {
                content: 'Cercei gives birth. To triplets. They look Braavosi. Jamie\'s uber pissed.',
                upvotes: 2
            },
            {
                content: 'After Danny and Jon found out their aunt/nephew they split up. Danny starts dating Tyrion only to later discover his her long lost brother. Ooops.',
                upvotes: 10
            },
            {
                content: 'Khal Drogo comes back to life and challenges Viserion to duel to avenge the Wall.',
                upvotes: 4
            }
        ], function(err, theories) {
           if (err) {
             console.log('err', err);
             return done(err);
           }
           console.log('theories created');
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