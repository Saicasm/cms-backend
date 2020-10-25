/* eslint-disable no-shadow */
const {createLogger, transports, format} = require('winston');

const {timestamp, label, printf, colorize} = format;

const myFormat = printf(({level, message, label, timestamp}) => {
  return `[${label}] ${timestamp}  ${level}: ${message}`;
});
const moduleName = 'cms-backend';
const logger = createLogger({
  format: format.combine(
    colorize(),
    label({label: 'api'}),
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.File({
      filename: './logs/info.log',
      level: 'info',
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.Console({
      formatter(options) {
        // Return string will be passed to logger.
        return `${moduleName} - ${options.message ? options.message : ''}`;
      },
      level: 'info',
    }),
  ],
});

// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new transports.Console({
//       format: format.simple(),
//     }));
//   }
module.exports = logger;
