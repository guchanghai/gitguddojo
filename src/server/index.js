var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('./db');
var cors = require('cors');
var Guid = require('guid');
var bunyan = require('bunyan');
var logger = bunyan.createLogger({
  name: 'gitguddojo',
  streams: [
    {
      level: 'info',
      path: './log/gitguddojo.log'            // log INFO and above to stdout
    },
    {
      level: 'error',
      path: './log/gitguddojo-error.log'  // log ERROR and above to a file
    }
  ]
});

const URL = {
  DEFAULT: '/api',
  LOGIN: '/api/login',
  LOGOUT: '/api/logout',
  GOOGLE_AUTH: '/api/auth/google',
  GOOGLE_AUTH_CALLBACK: '/api/auth/google/callback',
  FACEBOOK_AUTH: '/api/auth/facebook',
  FACEBOOK_AUTH_CALLBACK: '/api/auth/facebook/callback',
  SESSION_TIMEOUT: '/api/sessionTimeout',
  SIGN_UP: '/api/signUp',
  MAIN: '/api/main',
  PROFILE: '/api/profile'
};

// Connect to db
db.mysql.connect();

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

const GOOGLE_CLIENT_ID = '446756071190-9itae7ae3rn3ng0859577kq7glm46gj8.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'p0y9u6Qufh8j-FBffpq56iY1';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `https://localhost${URL.GOOGLE_AUTH_CALLBACK}`
  },
  function (accessToken, refreshToken, profile, cb) {
    db.users.findOrCreate(profile, function (err, user, exist) {
      if (!exist) {
        try {
          db.mysql.addUser(user, () => {});
        } catch (err) {
          return cb(err, user);
        }
      }

      return cb(err, user);
    });
  }
));

// Facebook Auth Sign In
const FACEBOOK_CLIENT_ID = '460351481337631';
const FACEBOOK_CLIENT_SECRET = 'a1322f6c68ea384ebccf2f2126220991';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: `https://localhost${URL.FACEBOOK_AUTH_CALLBACK}`,
    profileFields: ['id', 'name', 'email']
  },
  function (accessToken, refreshToken, profile, cb) {
    db.users.findOrCreate(profile, function (err, user, exist) {
      if (!exist) {
        try {
          db.mysql.addUser(user, () => {});
        } catch (err) {
          return cb(err, user);
        }
      }

      return cb(err, user);
    });
  }
));

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

// Create a new Express application.
var app = express();

// Enable CSP
app.use(cors());

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
    logger.info('login successfully!');
    res.send({
      msg: 'login successfully!'
    });
  });

app.post(URL.SIGN_UP,
  function (req, res) {
    const profile = {
      id: Guid.raw(),
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      streamId: req.body.streamId
    };

    db.users.findOrCreate(profile, function (err, user) {
      db.mysql.addUser(user, () => {
        res.send({
          user
        });
      });
    });
  });

app.get(URL.MAIN,
  require('connect-ensure-login').ensureLoggedIn(URL.SESSION_TIMEOUT),
  function (req, res) {
    res.send({
      msg: 'Welcome!'
    });
  });

app.get(URL.LOGOUT,
  function (req, res) {
    req.logout();
    res.send('logout successfully!')
  });

app.get(URL.PROFILE,
  require('connect-ensure-login').ensureLoggedIn(URL.SESSION_TIMEOUT),
  function (req, res) {
    res.send({
      user: req.user
    });
  });

// Google Auth Sign In
app.get(URL.GOOGLE_AUTH,
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

app.get(URL.GOOGLE_AUTH_CALLBACK,
  passport.authenticate('google', {
    failureRedirect: URL.SESSION_TIMEOUT
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/main');
  });

// Facebook Auth Sign In
app.get(URL.FACEBOOK_AUTH,
  passport.authenticate('facebook'));

app.get(URL.FACEBOOK_AUTH_CALLBACK,
  passport.authenticate('facebook', {
    failureRedirect: URL.SESSION_TIMEOUT
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/main');
  });

app.listen(3001);