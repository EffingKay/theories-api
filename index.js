const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const cors       = require('cors');
const config     = require('./config/config');
const routes     = require('./config/routes');

const app = express();

mongoose.connect(config.db, { useMongoClient: true });

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.use(cors())

app.listen(config.port, () => console.log(`Server has started on port ${config.port}`));