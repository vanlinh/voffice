var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    config = require('./server/config/config'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    cors = require('cors'),
    port = 3500;

var passport = require('passport');

mongoose.connect(config.url);

require('./server/config/passport')(passport);

app.use(express.static(__dirname + '/client'));

app.use(morgan('common'));

app.use(cookieParser());
app.use(session({
    secret: 'anystringoftext',
    saveUninitialized: 'true',
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.set('superSecret', config.secret); // secret variable


app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cors());

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
var api = express.Router();
require('./server/app/taskRoutes.js')(api, passport);
require('./server/app/userRoutes.js')(api, passport);
require('./server/app/customerRoutes.js')(api, passport);
//require('./server/app/logRoutes.js')(api, passport);
//require('./server/app/messageRoute.js')(api, passport);
require('./server/app/projectRoute.js')(api, passport);
////require('./app/routes.js')(api, passport);
app.use('/api/v1', api);

//
//var web = express.Router();
//require('./app/routes.js')(web,passport);
//app.use('/api', web);
require('./server/app/routes.js')(app, passport);
app.listen(port);
console.log('Office Online is listenning on :' + port);