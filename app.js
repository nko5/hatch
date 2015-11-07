var express, baudio, app, bodyParser, audioMiddleware, env, port;

express = require('express');
baudio = require('baudio');
app = express();
bodyParser = require('body-parser');
audioMiddleware = require('./server/middleware/audio');

// Create a static file server
// app.configure() is depreacted, c.f. https://github.com/strongloop/express/wiki/Migrating-from-3.x-to-4.x#appconfigure
env = process.env.NODE_ENV || 'development';
if ('development' === env) {
    app.use(express.static(__dirname + '/public'));
};

app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.render('index', {});
});

// tell express to use bodyParser for interpreting POST requests
app.use(bodyParser.json());  // support json bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Support encoded bodies
app.route('/api')
    .get(function(req, res) {
        res.send('Fetch an object');
    })
    .post(function(req, res) {
        audioMiddleware.loop(req.body);
        res.send('Create a new object');
    })
    .put(function(req, res) {
        res.send('Update an object');
    });

port = 8080;
app.listen(port);
console.log('Express server started on port %s', port);
