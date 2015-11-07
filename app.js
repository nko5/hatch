var express, app, env, audioMiddleware, port;

express = require('express');
app = express();
audioMiddleware = require('./server/middleware/audio');

// Create a static file server
// app.configure() is depreacted, c.f. https://github.com/strongloop/express/wiki/Migrating-from-3.x-to-4.x#appconfigure
env = process.env.NODE_ENV || 'development';
if ('development' === env) {
  app.use(express.static(__dirname + '/public'));
};

app.route('/api')
    .get(function(req, res) {
        res.send('Fetch an object');
    })
    .post(function(req, res) {
        res.send('Create a new object');
    })
    .put(function(req, res) {
        res.send('Update an object');
    });

// audioMiddleware.loop();

port = 8080;
app.listen(port);
console.log('Express server started on port %s', port);
