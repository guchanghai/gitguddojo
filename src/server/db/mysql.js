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
