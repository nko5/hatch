var express, app, env, port;

express = require('express');
var baudio = require('baudio');
app = express();

// Create a static file server
// app.configure() is depreacted, c.f. https://github.com/strongloop/express/wiki/Migrating-from-3.x-to-4.x#appconfigure
env = process.env.NODE_ENV || 'development';
if ('development' === env) {
  app.use(express.static(__dirname + '/public'));
};

// Get the dummy data
//var test = require('./server/ddata.json');
//var parse = JSON.parse(test);

var n = 0;
var b = baudio(function (t) {
    return Math.sin(t * 400 * Math.PI * 2) + Math.sin(t * 500) * (t % 2 > 1);
});
b.play();

port = 8080;
app.listen(port);
console.log('Express server started on port %s', port);
