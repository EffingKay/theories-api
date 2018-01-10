const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const cors       = require('cors');
const expressJWT = require('express-jwt');
const config     = require('./config/config');
const routes     = require('./config/routes');

const app = express();

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
        ]
    }));
app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next){
    if (err.name !== 'UnauthorizedError') return next();
    return res.status(401).json({ message: 'Unauthorized request.' });
}

app.use('/', routes);
app.use(cors());

app.listen(config.port, () => console.log(`Server has started on port ${config.port}`));