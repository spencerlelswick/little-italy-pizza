const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');

const indexRouter = require('./routes/index');
const ordersRouter = require('./routes/orders');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))
app.use(express.static(__dirname + '/public/images/builder'));
app.use("/", express.static("./node_modules/bootstrap/dist/"));
app.use(methodOverride('_method'));
app.use('/', indexRouter);
app.use('/order', ordersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: "Error", order:{items:{ pizzas:[],sides:[]}}});
});

module.exports = app;
