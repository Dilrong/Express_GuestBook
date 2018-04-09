var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Gobal Array, saving text
var entries = [];
app.locals.entries = entries;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (request, response) {
    response.render("index");
});

app.get("/new-entry", function (request, response) {
    response.render("new-entry")
});

app.post("/new-entry", function (request, response) {
    if(!request.body.title || !request.body.body){
      response.status(400).send("Entries must have a title and a body.");
      return;
    }
    entries.push({
        title : request.body.title,
        content: request.body.body,
        published: new Date()
    });
    response.redirect("/");
});
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
