var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function (username, password, cb) {
    db.users.findByUsername(username, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

const URL = {
  DEFAULT: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  SESSION_TIMEOUT: '/sessionTimeout',
  PROFILE: '/profile'
};

// Create a new Express application.
var app = express();

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({
  extended: true
}));

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get(URL.DEFAULT,
  function (req, res) {
    res.redirect(URL.SESSION_TIMEOUT);
  });

app.get(URL.SESSION_TIMEOUT,
  function (req, res) {
    res.status(401).send({
      msg: 'login failed or session timeout!'
    });
  });

app.post(URL.LOGIN,
  passport.authenticate('local', {
    failureRedirect: URL.SESSION_TIMEOUT
  }),
  function (req, res) {
    res.send({
      msg: 'login successfully!'
    });
  });

app.get(URL.LOGOUT,
  function (req, res) {
    req.logout();
    res.send( 'logout successfully!' )
  });

app.get(URL.PROFILE,
  require('connect-ensure-login').ensureLoggedIn(URL.SESSION_TIMEOUT),
  function (req, res) {
    res.send({
      user: req.user
    });
  });

app.listen(3001);
