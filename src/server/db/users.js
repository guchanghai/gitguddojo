var records = [];

exports.records = records;

exports.findById = function (id, cb) {
  process.nextTick(function () {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.id === id) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

exports.findByUsername = function (username, cb) {
  process.nextTick(function () {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

exports.findOrCreate = function (user, cb) {
  process.nextTick(function () {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.id === user.id) {
        return cb(null, record);
      }
    }

    const newRecord = {
      id: user.id,
      username: user.name.givenName,
      displayName: user.displayName,
      emails: user.emails.slice(0)
    };

    records.push(newRecord)
    return cb(null, newRecord);
  });
}