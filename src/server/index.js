var express = require("express");
const fileUpload = require("express-fileupload");
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var db = require("./db");
var cors = require("cors");
var Guid = require("guid");
var logger = require("../utils/logger");
var FindFriendUtil = require("../utils/findFriends");

const URL = {
  DEFAULT: "/api",
  CHAT_ROOMS: "/api/chat/rooms",
  CHAT_ROOM: "/api/chat/room",
  FRIENDS: "/api/friends",
  LOGIN: "/api/login",
  LOGOUT: "/api/logout",
  GOOGLE_AUTH: "/api/auth/google",
  GOOGLE_AUTH_CALLBACK: "/api/auth/google/callback",
  FACEBOOK_AUTH: "/api/auth/facebook",
  FACEBOOK_AUTH_CALLBACK: "/api/auth/facebook/callback",
  PASSWORD: "/api/password",
  SESSION_TIMEOUT: "/api/sessionTimeout",
  SIGN_UP: "/api/signUp",
  STREAM: "/api/stream",
  MAIN: "/api/main",
  PROFILE: "/api/profile",
  PHOTO: "/api/photo",
  VERIFY_STEAM: "/api/verifySteam"
};

const FRIENDS_MAX_AMOUNT = 4;

// Connect to db
db.mysql.connect();

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
  new Strategy(function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
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
  })
);

const GOOGLE_CLIENT_ID =
  "446756071190-9itae7ae3rn3ng0859577kq7glm46gj8.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "p0y9u6Qufh8j-FBffpq56iY1";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `https://www.gitguddojo.com${URL.GOOGLE_AUTH_CALLBACK}`
    },
    function(accessToken, refreshToken, profile, cb) {
      db.users.findOrCreate(
        {
          ...profile,
          source: "google"
        },
        function(err, user, exist) {
          if (!exist) {
            try {
              db.mysql.addUser(user, () => {});
            } catch (err) {
              return cb(err, user);
            }
          }

          return cb(err, user);
        }
      );
    }
  )
);

// Facebook Auth Sign In
const FACEBOOK_CLIENT_ID = "460351481337631";
const FACEBOOK_CLIENT_SECRET = "a1322f6c68ea384ebccf2f2126220991";

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: `https://www.gitguddojo.com${URL.FACEBOOK_AUTH_CALLBACK}`,
      profileFields: ["id", "name", "emails"]
    },
    function(accessToken, refreshToken, profile, cb) {
      db.users.findOrCreate(
        {
          ...profile,
          source: "facebook"
        },
        function(err, user, exist) {
          if (!exist) {
            try {
              db.mysql.addUser(user, () => {});
            } catch (err) {
              return cb(err, user);
            }
          }

          return cb(err, user);
        }
      );
    }
  )
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function(err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// Create a new Express application.
var app = express();
var http = require("http").Server(app);

// Enable CSP
app.use(cors());

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require("morgan")("combined"));
app.use(
  require("body-parser").urlencoded({
    extended: true
  })
);

app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(fileUpload());

// Define routes.
app.get(URL.DEFAULT, function(req, res) {
  res.redirect(URL.SESSION_TIMEOUT);
});

app.get(URL.SESSION_TIMEOUT, function(req, res) {
  res.status(401).send({
    msg: "login failed or session timeout!"
  });
});

app.post(
  URL.LOGIN,
  passport.authenticate("local", {
    failureRedirect: URL.SESSION_TIMEOUT
  }),
  function(req, res) {
    logger.logger.info("login successfully!");
    res.send({
      msg: "login successfully!"
    });
  }
);

app.post(URL.SIGN_UP, function(req, res) {
  const profile = {
    id: Guid.raw(),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    streamId: req.body.streamId,
    source: "own"
  };

  db.users.findOrCreate(profile, function(err, user) {
    db.mysql.addUser(user, () => {
      res.send({
        user
      });
    });
  });
});

app.get(
  URL.FRIENDS,
  require("connect-ensure-login").ensureLoggedIn(URL.SESSION_TIMEOUT),
  function(req, res) {
    var randomUsers = FindFriendUtil.findFriends(
      FRIENDS_MAX_AMOUNT,
      req.user.id
    );

    const friends = randomUsers.map(user => {
      return {
        id: user.id,
        name: user.username,
        streamId: user.streamId,
        operators: [user.operator_a, user.operator_b, user.operator_c],
        platforms: ["steam"]
      };
    });

    res.send({
      friends
    });
  }
);

app.get(
  URL.MAIN,
  require("connect-ensure-login").ensureLoggedIn(URL.SESSION_TIMEOUT),
  function(req, res) {
    res.send({
      msg: "Welcome!"
    });
  }
);

app.get(URL.LOGOUT, function(req, res) {
  req.logout();
  res.send("logout successfully!");
});

app.get(
  URL.PROFILE,
  require("connect-ensure-login").ensureLoggedIn(URL.SESSION_TIMEOUT),
  function(req, res) {
    res.send({
      user: req.user
    });
  }
);

app.post(
  URL.PROFILE,
  require("connect-ensure-login").ensureLoggedIn(URL.SESSION_TIMEOUT),
  function(req, res) {
    const user = req.body;

    db.mysql.updateUser(user, result => {
      res.send({
        result
      });
    });
  }
);

app.post(
  URL.PHOTO,
  require("connect-ensure-login").ensureLoggedIn(URL.SESSION_TIMEOUT),
  function(req, res) {
    const photo = req.files;

    db.mysql.updateUserPhoto(req.user.id, photo, result => {
      res.send({
        result
      });
    });
  }
);

// Google Auth Sign In
app.get(
  URL.GOOGLE_AUTH,
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get(
  URL.GOOGLE_AUTH_CALLBACK,
  passport.authenticate("google", {
    failureRedirect: URL.SESSION_TIMEOUT
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/main");
  }
);

// Facebook Auth Sign In
app.get(
  URL.FACEBOOK_AUTH,
  passport.authenticate("facebook", {
    scope: ["email"]
  })
);

app.get(
  URL.FACEBOOK_AUTH_CALLBACK,
  passport.authenticate("facebook", {
    failureRedirect: URL.SESSION_TIMEOUT
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/main");
  }
);

app.post(
  URL.PASSWORD,
  require("connect-ensure-login").ensureLoggedIn(URL.SESSION_TIMEOUT),
  function(req, res) {
    const newUserInfo = req.body;

    db.users.findById(newUserInfo.id, function(err, user) {
      if (err) {
        res.status(401).send({
          msg: "Cannot find the user!"
        });
        return;
      }

      if (user.password !== newUserInfo.oldPassword) {
        res.status(401).send({
          msg: "You current password is wrong!"
        });
        return;
      }

      db.mysql.updatePassword(newUserInfo, result => {
        res.send({
          result
        });
      });
    });
  }
);

app.post(
  URL.STREAM,
  require("connect-ensure-login").ensureLoggedIn(URL.SESSION_TIMEOUT),
  function(req, res) {
    const newUserInfo = req.body;

    db.users.findById(newUserInfo.id, function(err, user) {
      if (err) {
        res.status(401).send({
          msg: "Cannot find the user!"
        });
        return;
      }

      if (user.streamId && user.streamId !== newUserInfo.streamId) {
        res.status(401).send({
          msg: "You current stream ID is wrong!"
        });
        return;
      }

      db.mysql.updateStreamId(newUserInfo, result => {
        res.send({
          result
        });
      });
    });
  }
);

app.post(
  URL.VERIFY_STEAM,
  require("connect-ensure-login").ensureLoggedIn(URL.SESSION_TIMEOUT),
  function(req, res) {
    const steamId = req.body.newStreamId;

    db.mysql.checkSteamId(steamId, function(err, steam) {
      if (!steam) {
        FindFriendUtil.getProfileBySteamId(steamId, steamUserOperators => {
          if (steamUserOperators && Array.isArray(steamUserOperators)) {
            db.mysql.addSteamId(
              steamId,
              steamUserOperators[0],
              steamUserOperators[1],
              steamUserOperators[2],
              () => {
                res.send({
                  msg: "stream ID is verified online."
                });
              }
            );
          } else {
            res.status(404).send({
              msg: "Cannot verify this stream ID!"
            });
          }
        });
      } else {
        res.send({
          msg: "stream ID is verified."
        });
      }
    });
  }
);

// chat functionality
var io = require("socket.io")(http);

// live chat rooms
const chatRooms = [];

// Create or find chat room
app.post(URL.CHAT_ROOM, (req, res) => {
  let room = chatRooms.find(room => {
    // room has same user amount
    const sameUsersAmount = room.users.length === req.body.users.length;

    // all users are same
    return (
      sameUsersAmount &&
      room.users.every(roomUser =>
        req.body.users.find(user => user.id === roomUser.id)
      )
    );
  });

  const response = () =>
    res.send({
      id: room.id,
      room: room.users
    });

  // create new room if not found
  if (!room) {
    room = {
      id: Guid.raw(),
      users: req.body.users
    };

    const roomId = `/api/chat/${room.id}`;
    room.chat = io.of(roomId);

    room.chat.on("connection", function(socket) {
      // welcome message to the new user
      socket.emit("welcome-message", {
        userName: "System",
        time: new Date(),
        message: "You are in the chat room now!"
      });

      // broadcast the message to everyone in the room
      socket.on("message", message => {
        db.mysql.addChatHistory(room.id, message, chatHistory => {
          room.chat.emit("broadcast-message", chatHistory);
        });
      });
    });

    // remember the new room
    chatRooms.push(room);

    // add room in db
    db.mysql.addChatRoom(room, response);
  } else {
    response();
  }
});

app.get(URL.CHAT_ROOMS, (req, res) => {
  const userId = req.query.userId;

  db.mysql.findChatRooms(userId, result => {
    // mark live chat rooms with status=1
    result.forEach(room => {
      if (chatRooms.find(chatRoom => chatRoom.id === room.id)) {
        room.status = 1;
      }
    });

    res.send({
      rooms: result
    });
  });
});

app.get(URL.CHAT_ROOM, (req, res) => {
  const roomId = req.query.roomId;

  db.mysql.findChatRoomHistory(roomId, result => {
    res.send({
      history: result
    });
  });
});

http.listen(3001, "0.0.0.0", () => {
  logger.logger.info("listening on 3001");
});
