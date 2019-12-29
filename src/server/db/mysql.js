var mysql = require('mysql');
var users = require('./users');

var connection;

exports.connect = function () {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'localnode',
    password: 'Localnode2019#',
    database: 'gitguddojo'
  });

  connection.connect();

  // get all the user info
  connection.query('SELECT * from users', function (error, results) {
    if (error) throw error;
    users.records.length = 0;
    users.records.push.apply(users.records, results);
  });
}

exports.addUser = function (user, cb) {
  connection.query('INSERT INTO users SET ?', user, function (error, results) {
    if (error) throw error;

    // get all the user info
    connection.query('SELECT * from users', function (error, results) {
      if (error) throw error;
      users.records.length = 0;
      users.records.push.apply(users.records, results);
    });

    // Neat!
    cb(null, results);
  });

  // console.log(query.sql);
}

exports.updateUser = function (user, cb) {

  connection.query('UPDATE users SET displayName = ?, username = ?, email = ?, bio = ? WHERE id = ?',
    [user.displayName, user.username, user.email, user.bio, user.id],
    function (error, results) {

      // get all the user info
      connection.query('SELECT * from users', function (error, results) {
        if (error) throw error;
        users.records.length = 0;
        users.records.push.apply(users.records, results);
      });

      if (error)
        throw error;
      else // Neat!
        cb(null, results);
    });
}

exports.updatePassword = function (newUserInfo, cb) {
  connection.query('UPDATE users SET password = ? WHERE id = ?',
    [newUserInfo.newPassword, newUserInfo.id],
    function (error, results) {

      // get all the user info
      connection.query('SELECT * from users', function (error, results) {
        if (error) throw error;
        users.records.length = 0;
        users.records.push.apply(users.records, results);
      });

      if (error)
        throw error;
      else // Neat!
        cb(null, results);
    });
}

exports.updateStreamId = function (newUserInfo, cb) {
  connection.query('UPDATE users SET streamId = ? WHERE id = ?',
    [newUserInfo.newStreamId, newUserInfo.id],
    function (error, results) {

      // get all the user info
      connection.query('SELECT * from users', function (error, results) {
        if (error) throw error;
        users.records.length = 0;
        users.records.push.apply(users.records, results);
      });

      if (error)
        throw error;
      else // Neat!
        cb(null, results);
    });
}

exports.addChatRoom = function (room, cb) {
  const roomInfo = {};

  roomInfo.id = room.id;
  roomInfo.userIDs = room.users.map( user => user.id ).join(',');
  roomInfo.userNames = room.users.map( user => user.name ).join(',');
  roomInfo.created = new Date();
  roomInfo.status = 0; // on going

  connection.query('INSERT INTO chat_rooms SET ?', roomInfo,
    function (error, results) {
      if (error)
        throw error;
      else // Neat!
        cb(null, results);
    });
}