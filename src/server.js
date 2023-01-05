"use strict";

const express = require("express");
const path = require('path');

const app = express();
const PORT = 4300;

const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const connectRedis = require("connect-redis");
const dotenv = require("dotenv").config()
const { createClient } = require("redis");
const passport = require("passport");

const router = require("./routes");
const { passportConfig } = require("./utils/passport");

//app middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
app.set("view engine", "ejs");

//Redis configurations
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);
const RedisStore = connectRedis(session);

//Configure session middleware
const SESSION_SECRET = process.env.SESSION_SECRET;
passportConfig();

app.use(
 session({
   store: new RedisStore({ client: redisClient }),
   secret: SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
   cookie: {
     secure: false,  // if true only transmit cookie over https
     httpOnly: false, // if true prevent client side JS from reading the cookie
     maxAge: 1000 * 60 * 10, // session max age in milliseconds
   },
 })
);

app.use(csrf());
app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(passport.initialize());
app.use(passport.session());

//router
const indexRouter = require('../src/routes/index');

//Router middleware
//app.use(router);
app.use('/', indexRouter);

app.listen(PORT, () => {
 console.log(`Server started at port ${PORT}`);
});