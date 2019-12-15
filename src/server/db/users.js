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
      if (record.username === username || record.email === username) {
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
        return cb(null, record, true);
      }
    }

    const newRecord = {
      id: user.id,
      username: (user.name && user.name.givenName) || user.username,
      displayName: user.displayName || user.givenName || (user.name && user.name.givenName) || user.username,
      email: Array.isArray(user.emails) ? user.emails[0].value : (user.email || 'changhaigu@126.com'),
      password: user.password,
      streamId: user.streamId
    };

    records.push(newRecord);
    return cb(null, newRecord);
  });
}