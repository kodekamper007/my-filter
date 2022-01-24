const { NODE_ENV, HOST, PORT } = require("./config/vars.js");
const logger = require("./config/logger");
const app = require("./config/express");

// listen to requests
app.listen(PORT, () => {
  logger.info(`server running in ${NODE_ENV} mode:`);
  logger.info(`listening on ${HOST}:${PORT}`);
});

/*
// exports express
// @public
*/
module.exports = app;
