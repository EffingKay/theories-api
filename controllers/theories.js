const Theory = require('../models/theory');

function theoriesIndex(req, res) {
    var query = Theory.find({}, null, {sort: {'createdAt': -1}});
    query.exec((err, theories) => {
        if (err) return res.status(500).json({ message: 'Something went wrong'});
        return res.status(200).json(theories);
    });
}

// function theoriesIndex(req, res) {
//     Theory.find({})
//     .populate('user')
//     .exec((err, theories) => {
//       if(err) return res.status(500).json({ message: 'Something went wrong.' });
//       return res.status(200).json(theories);
//     });
// }

function theoriesCreate(req, res) {
    const theory = new Theory(req.body);
    theory.save((err, theory) => {
        if (err) return res.status(500).json({ message: 'Something went wrong.' });
        return res.status(201).json(theory);
    });
}

function theoriesDelete(req, res){
    Theory.findByIdAndRemove(req.params.id, (err,theory) => {
        if (err) return res.status(500).json({ message: 'Something went wrong.' });
        if (!theory) return res.status(404).json({ message: 'Theory not found.' });
        return res.sendStatus(204);
    });
}

function theoriesShow(req, res) {
    Theory.findById(req.params.id)
        .populate('user')
        .exec((err, theory) => {
            if (err) return res.status(500).json({ message: 'Something went wrong.' });
            if (!theory) return res.status(404).json({ message: 'theory not found.' });
            console.log(theory.user)
            return res.status(200).json(theory);
        });
}

function theoriesUpdate(req, res){
    Theory
    .findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, theory) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!theory) return res.status(404).json({ message: 'Theory not found' });
      return res.status(200).json(theory);
    });
}

module.exports = {
    index: theoriesIndex,
    show: theoriesShow,
    create: theoriesCreate,
    update: theoriesUpdate,
    delete: theoriesDelete
};


function sortTheories(theories) {
    theories.sort((one, two) => {
      return one.upvotes < two.upvotes;
    });
  }
