
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var services = require('./routes/services');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.cookieParser('nfctrip'));
//app.use(express.session({cookie:{maxAge:3600000}}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/services/test',services.test);
app.get('/services/join',services.join);
app.get('/services/login',services.login);
app.get('/services/visit',services.visit);
app.get('/services/showhistory',services.showhistory);
app.get('/services/checkid',services.checkid);
app.get('/services/isvisit',services.isvisit);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
