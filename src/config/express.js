const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const error = require("../api/middlewares/error");
const routes = require("../api/routes/v1");
const mongoose = require('mongoose');
const {
  DB_NAME,
  DB_HOST,
  DB_PORT
} = require('./vars');

/*
 express instance
 @public
*/
const app = express();

// The database connection for mongodb
mongoose.connect(
  `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// request logging. dev: console | production: file
app.use(morgan("dev"));

// convert request body to JSON
app.use(express.json());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api routes
app.get("/", (req, res) => {
  res.send({
    status: 200,
    message: "Welcome to Issuers Services API",
  });
});

app.use("/api", routes);

/* 
error handlers 
*/

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

// Init public folder
app.use('/static', express.static('./public'));

// Set the view engine to ejs
app.set('view engine', 'ejs')

module.exports = app;
