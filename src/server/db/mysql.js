var mysql = require("mysql");
var users = require("./users");
var Guid = require("guid");
var logger = require("../../utils/logger");

var connection;

function checkDBOperationResult(info, error) {
  if (error) {
    logger.logger.info(`ERROR: ${info} : ${error.stack}`);
    throw error;
  }
}

function getAllUsers() {
  // get all the user info
  connection.query(
    "SELECT distinct a.*, b.* FROM users a left join stream_info b on a.streamId = b.streamId",
    function(error, results) {
      checkDBOperationResult("Read all users", error);

      logger.logger.info("get all users amount " + results.length);
      users.records.length = 0;
      users.records.push.apply(users.records, results);
    }
  );
}

exports.connect = function() {
  connection = mysql.createConnection({
    host: "localhost",
    user: "localnode",
    password: "Localnode2019#",
    database: "gitguddojo"
  });

  connection.connect(function(error) {
    checkDBOperationResult("Connect DB", error);

    logger.logger.info("connected as id " + connection.threadId);
    getAllUsers();
  });
};

exports.addUser = function(user, cb) {
  connection.query("INSERT INTO users SET ?", user, function(error, results) {
    checkDBOperationResult("Create new user", error);

    // get all the user info
    getAllUsers();

    // Neat!
    cb(null, results);
  });

  // console.log(query.sql);
};

exports.updateUser = function(user, cb) {
  connection.query(
    "UPDATE users SET displayName = ?, username = ?, email = ?, bio = ? WHERE id = ?",
    [user.displayName, user.username, user.email, user.bio, user.id],
    function(error, results) {
      checkDBOperationResult("Update user", error);

      // get all the user info
      getAllUsers();

      cb(null, results);
    }
  );
};

exports.updateUserPhoto = function(userId, photo, cb) {
  connection.query(
    "UPDATE users SET photo = ? WHERE id = ?",
    [photo, userId],
    function(error, results) {
      checkDBOperationResult("Update user profile", error);

      // get all the user info
      getAllUsers();

      cb(null, results);
    }
  );
};

exports.updatePassword = function(newUserInfo, cb) {
  connection.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [newUserInfo.newPassword, newUserInfo.id],
    function(error, results) {
      checkDBOperationResult("Update password", error);

      // get all the user info
      getAllUsers();

      cb(null, results);
    }
  );
};

exports.checkSteamId = function(steamId, cb) {
  connection.query(
    `SELECT * FROM stream_info where streamId = "${steamId}"`,
    function(error, results) {
      if (error) {
        cb(error);
      } else if (results && results.length >= 1) {
        cb(null, results[0]);
      } else {
        cb("No stream id!");
      }
    }
  );
};

exports.updateStreamId = function(newUserInfo, cb) {
  connection.query(
    "UPDATE users SET streamId = ? WHERE id = ?",
    [newUserInfo.newStreamId, newUserInfo.id],
    function(error, results) {
      checkDBOperationResult("Update streamId", error);

      // get all the user info
      getAllUsers();

      cb(null, results);
    }
  );
};

exports.addChatRoom = function(room, cb) {
  const roomInfo = {};

  roomInfo.id = room.id;
  roomInfo.userIDs = room.users.map(user => user.id).join(",");
  roomInfo.userNames = room.users.map(user => user.streamId).join(",");
  roomInfo.created = new Date();
  roomInfo.status = 0; // on going

  connection.query("INSERT INTO chat_rooms SET ?", roomInfo, function(
    error,
    results
  ) {
    checkDBOperationResult("Create new chat room", error);
    cb(null, results);
  });
};

exports.findChatRooms = function(userId, cb) {
  connection.query(
    "SELECT * from chat_rooms WHERE userIds like ? ORDER BY created desc",
    `%${userId}%`,
    function(error, results) {
      checkDBOperationResult("Find chat room", error);
      cb(results);
    }
  );
};

exports.addChatHistory = function(roomId, message, cb) {
  const history = {};

  history.id = Guid.raw();
  history.roomId = roomId;
  history.userId = message.userId;
  history.userName = message.from;
  history.time = new Date();
  history.message = message.message;

  connection.query("INSERT INTO chat_logs SET ?", history, function(error) {
    checkDBOperationResult("Save chat log", error);
    cb(history);
  });
};

exports.findChatRoomHistory = function(roomId, cb) {
  connection.query(
    "SELECT * from chat_logs WHERE roomId = ? ORDER BY time",
    roomId,
    function(error, results) {
      checkDBOperationResult("Find chat room history", error);
      cb(results);
    }
  );
};
