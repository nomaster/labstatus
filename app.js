
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

var options = {
  api: '0.12',
  space: 'GarageLab e.V.',
  logo: 'http://garage-lab.de/wp-content/themes/garagelab/images/logo_temp.png',
  url: 'http://garage-lab.de',
  address: 'Bilker Allee 217, Düsseldorf, Germany',
  open: false,
  contact: {
    twitter: '@grglb'
  },
  issue_report_channels: ['twitter'],
  icon: {
    open: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Neon_Open_Sign.jpg/120px-Neon_Open_Sign.jpg',
    closed: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/505px_Closed_Sign.jpg/101px-505px_Closed_Sign.jpg'
  }
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/status', routes.index);
app.get('/status.json', function(req, res){
  if (global.status == 'open') {
    options.open = true;
  } else {
    options.open = false;
  };
  res.type('application/json; charset=UTF-8');
  res.send(JSON.stringify(options));
});

app.post('/status', function(req, res){
  if (req.body.key == 'QoLhwBsq5ZhIsQZt1xKS') {
    global.status = req.body.status;
    res.send('thank you');
  } else {
    res.send('access denied');
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
