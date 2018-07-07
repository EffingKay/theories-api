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
            { url: '/users/:id', methods: ['GET'] },
        ]
    }));
app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next){
    if (err.name !== 'UnauthorizedError') return next();
    return res.status(401).json({ message: 'Unauthorized request.' });
}

app.use('/', routes);

var isPreflight = function(req) {
    var isHttpOptions = req.method === 'OPTIONS';
    var hasOriginHeader = req.headers['origin'];
    var hasRequestMethod = req.headers['access-control-request-method'];
    return isHttpOptions && hasOriginHeader && hasRequestMethod;
  };
  
  var createWhitelistValidator = function(whitelist) {
    return function(val) {
      for (var i = 0; i < whitelist.length; i++) {
        if (val === whitelist[i]) {
          return true;
        }
      }
      return false;
    }
  };
  
    var originWhitelist = [
        'null',
        'https://gotheory.netlify.com/*',
        'https://localhost:3000/*'
    ];
  
  var corsOptions = {
    allowOrigin: createWhitelistValidator(originWhitelist),
    allowCredentials: true,
    shortCircuit: true,
    allowMethods: ['GET', 'DELETE', 'OPTIONS', 'POST', 'PUT', 'PATCH'],
    allowHeaders: ['Timezone-Offset'],
    maxAge: 120,
    exposeHeaders: ['X-Powered-By']
  };
  
  var handleCors = function(options) {
    return function(req, res, next) {
  
      if (options.allowOrigin) {
        var origin = req.headers['origin'];
        if (options.allowOrigin(origin)) {
          res.set('Access-Control-Allow-Origin', origin);
        } else if (options.shortCircuit) {
          res.status(403).end();
          return;
        }
        res.set('Vary', 'Origin');
      } else {
        res.set('Access-Control-Allow-Origin', '*');
      }
  
      if (options.allowCredentials) {
        res.set('Access-Control-Allow-Credentials', 'true');
      }
  
      if (isPreflight(req)) {
        if (options.allowMethods) {
          res.set('Access-Control-Allow-Methods',
              options.allowMethods.join(','));
        }
        if (typeof(options.allowHeaders) === 'function') {
          var headers = options.allowHeaders(req);
          if (headers) {
            res.set('Access-Control-Allow-Headers', headers);
          }
        } else if (options.allowHeaders) {
          res.set('Access-Control-Allow-Headers',
              options.allowHeaders.join(','));
        }
        if (options.maxAge) {
          res.set('Access-Control-Max-Age', options.maxAge);
        }
        res.status(204).end();
        return;
      } else if (options.exposeHeaders) {
        res.set('Access-Control-Expose-Headers', options.exposeHeaders.join(','));
      }
      next();
    }
  };

app.use(handleCors(corsOptions));  
app.use(cors());

app.listen(config.port, () => console.log(`Server has started on port ${config.port}`));