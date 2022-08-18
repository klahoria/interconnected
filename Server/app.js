var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var generatePassword = require("./routes/Forgot_Password/Routes");

const user = require("./models/user_logs");
const errorlogger = require("./controllers/errorlogger/errorlogger");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// app.use(async (req, res, next) => {
//   let data = req.body;
//   console.log;
//   if (data) {
//     req.body = new_data;
//     next();
//     return;
//   }
//   next();
// });

app.use((req, res, next) => {
  user
    .create({
      ip_address: req.ip,
      headers: req.headers,
      endpoint: req.path,
      call_time: req["_startTime"],
      time_elapsed: "",
      user_token: req.headers.access_token,
      user_type: "",
      logged_in: req?.headers?.access_token ? true : false,
      user_rank: "",
      body: req.body || null,
      query: "",
    })
    .then((response) => {
      next();
    });
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", generatePassword);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use("/errors/logger", errorlogger);

module.exports = app;
