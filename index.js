const express    = require('express');
require('sqreen');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const cors       = require('cors');
const expressJWT = require('express-jwt');
const helmet     = require('helmet');
const config     = require('./config/config');
const routes     = require('./config/routes');

const app = express();

app.options('*', cors());
app.use(cors());
app.use(helmet());

mongoose.connect(config.db, { useMongoClient: true });

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', expressJWT({ secret: config.secret })
    .unless({
        path: [
            { url: '/register', methods: ['POST'] },
            { url: '/login',    methods: ['POST'] },
            { url: '/theories', methods: ['GET'] },    
            { url: '/', methods: ['GET'] },
            { url: '/users/:id', methods: ['GET'] },
        ]
    }));
app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next){
    if (err.name !== 'UnauthorizedError') return next();
    return res.status(401).json({ message: 'Unauthorized request.' });
}

app.use('/', routes);

app.listen(config.port, () => console.log(`CORS-enabled server has started on port ${config.port}`));