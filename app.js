var express, app, env, audioMiddleware, port;

express = require('express');
app = express();

// Create a static file server
// app.configure() is depreacted, c.f. https://github.com/strongloop/express/wiki/Migrating-from-3.x-to-4.x#appconfigure
env = process.env.NODE_ENV || 'development';
if ('development' === env) {
  app.use(express.static(__dirname + '/public'));
};

audioMiddleware = require('./server/middleware/audio');
audioMiddleware.loop();

port = 8080;
app.listen(port);
console.log('Express server started on port %s', port);
