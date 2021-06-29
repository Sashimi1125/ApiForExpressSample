var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var apiVersion1 = require("./api_version/app1");
var apiVersion2 = require("./api_version/api2");

//test
console.log('hello world')
var url = require("url")
var parsedUrl = url.parse("http://www.example.com/profile?name=barry")
console.log(parsedUrl.protocol);  
console.log(parsedUrl.host);       
console.log(parsedUrl.query);



app.use("/v1", apiVersion1);
app.use("/v2", apiVersion2);


// app.listen(4000, function() {
//   console.log("App started on port 4000");
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
