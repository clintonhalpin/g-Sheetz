var logger          = require('morgan'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    bodyParser      = require('body-parser'),
    connectLivereload = require('connect-livereload'),
    config = require('./etc/.env.js');

var app = express();

app.use(express.static(__dirname + '/dist')); 
app.set('port', process.env.PORT || config.port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
  app.use(connectLivereload({port: config.lrport}));
}

app.get('/', function(req, res){
  res.status(200).send('Hello world!');
});

app.use(require('./api/store'));

var server = http.createServer(app);
var boot = function () {
  server.listen(app.get('port'), function(){
    console.info('Express server listening on port ' + app.get('port'));
  });
}
  
var shutdown = function() {
  server.close();
}

if (require.main === module) {
  boot();
}
else {
  console.info('Running app as a module')
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}