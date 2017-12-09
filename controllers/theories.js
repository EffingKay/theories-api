const Theory = require('../models/theory');

function theoriesIndex(req, res) {
    Theory.find((err, theories) => {
        if (err) return res.status(500).json({ message: 'Something went wrong'});
        sortTheories(theories);
        return res.status(200).json(theories)
    });
}

module.exports = {
    index: theoriesIndex
};


function sortTheories(theories) {
    theories.sort((one, two) => {
      return one.upvotes < two.upvotes;
    });
  }