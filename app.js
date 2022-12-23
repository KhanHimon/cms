const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const reload = require('reload');
const jsonwebtoken = require("jsonwebtoken");

const indexRouter = require('./routes/index.route');
const loginRouter = require('./routes/login.route');
const userRouter = require('./routes/users.route');
const adminRouter = require('./routes/admin.route');
const api_router = require('./routes/api.route');
const app_router = require('./routes/app_user.route');
const app_sale = require('./routes/app_sale.route');



// thêm thư viện mongoose để kết nối vớ mongodb
const mongoose = require('mongoose');
// kết nối mongodb
mongoose.connect('mongodb+srv://admin:admin@hethongquanly.2ltmkxk.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true});
const db = mongoose.connection;
//Bắt sự kiện error
db.on('error', function(err) {
  if (err) console.log(err)
});
//Bắt sự kiện open
db.once('open', function() {
  console.log("Kết nối database thành công !");
});

var app = require('express')();

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000},
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter,);
app.use('/api',api_router);
app.use('/app', app_router);
app.use('/sale',app_sale);
reload(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
