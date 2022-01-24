const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    /*
    // - write to all logs with level `info` and below to `combined.log`
    // - write all logs error (and below) to `error.log`.
    */
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

/*
// !production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
*/
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

logger.stream = {
  write: () => {
    logger.info(message.trim());
  },
};

module.exports = logger;
