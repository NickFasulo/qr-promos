const createError = require("http-errors");
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const expressValidator = require("express-validator");

let MongoStore = require("connect-mongo")(session);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users/users");


require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://NickF:olusaf12@nickfasulo-dram8.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(`MongoDB Error: ${err}`));

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(flash());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true
    }),
    cookie: {
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(passport.initialize());
app.use(passport.session());
// require("./lib/passport/passport")(passport);

app.use(
  expressValidator({
    errorFormatter: (param, message, value) => {
      let namespace = param.split(".");
      let root = namespace.shift();
      let formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }

      return {
        param: formParam,
        message: message,
        value: value
      };
    }
  })
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;