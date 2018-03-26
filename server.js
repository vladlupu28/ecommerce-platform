var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
var session = require('express-session');
var flash    = require('connect-flash');
const cors = require('cors');
var fs = require("fs");
var app = express();
app.use(logger('dev'));
app.use(cors());
app.options('*', cors())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash()); 
app.use('/', express.static('app'));
// const strategy = new Auth0Strategy({
//   domain: 'YOUR_AUTH0_DOMAIN',
//   clientID: 'YOUR_CLIENT_ID',
//   clientSecret: 'YOUR_CLIENT_SECRET',
//   callbackURL:  'http://localhost:3000/homepage.html'
// }, (accessToken, refreshToken, extraParams, profile, done) => {
//   return done(null, profile);
// });

// passport.use(strategy);
// // require('./config/passport')(passport);
// app.use(passport.initialize());
// app.use(session({ secret: 'marketsecret' })); 
// app.use(passport.session()); 
// require(path.join(__dirname,'routes', 'auth.js'))(app, passport);
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

// app.use(passport.initialize());
// app.use(passport.session());
fs
    .readdirSync(path.join(__dirname, 'routes'))
    .filter(function(file) {
        return (file.indexOf(".") !== 0 && file != 'auth.js')
    })
    .forEach(function(file) {
        app.use(require(path.join(__dirname, 'routes', file)));
    });
app.listen(3000);
//addd a comment