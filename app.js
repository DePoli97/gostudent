/**
 * Web Atelier 2022  Exercise 5 - Web Apps and APIs with Express
 *
 * Student: __STUDENT NAME__
 *
 * Main Server Application
 *
 * version 999 Thu Oct 20 2022 18:33:12 GMT+0200 (Central European Summer Time)
 *
 */






//require framework and middleware dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override');

const fs = require('fs-extra');



//init framework
const app = express();



app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public'), {index: "index.html"}));

app.use(express.json({limit: '4MB'}));    // parse application/json
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');


//controllers
const routers = require('./routes');

app.use(routers.home);
app.use('/games', routers.games);
app.use('/high_scores', routers.high_scores);


//default fallback handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  //if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    });
  //}

  // production error handler
  // no stacktraces leaked to user
  // app.use(function(err, req, res, next) {
  //   res.status(err.status || 500);
  //   res.json({
  //     message: err.message,
  //     error: {}
  //   });
  // });



//start server
app.set('port', process.env.PORT || 8888);

var server = require('http').createServer(app);

server.on('listening', function() {
  console.log('Express server listening on port ' + server.address().port);
});

server.listen(app.get('port'));


