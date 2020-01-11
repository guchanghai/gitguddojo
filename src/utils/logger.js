// logger for server index
var bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'gitguddojo',
  streams: [{
      level: 'info',
      path: './log/gitguddojo.log' // log INFO and above to stdout
    },
    {
      level: 'error',
      path: './log/gitguddojo-error.log' // log ERROR and above to a file
    }
  ]
});

logger.info('Global logger is created!');

exports.logger = logger;
