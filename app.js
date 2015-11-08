var express, baudio, app, tests, bodyParser, audioMiddleware, env, port;

express = require('express');
baudio = require('baudio');
app = express();  // Main app
tests = express();  // Manage routes for test
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

tests.use('/lib', express.static(__dirname + '/tests/lib'));
tests.use('/specs', express.static(__dirname + '/tests/specs'));
tests.get('/test.config.js', function(req, res) {
    res.sendFile(__dirname + '/tests/test.config.js');
});
tests.get('/', function(req, res) {
    res.render('testRunner', {});
});
app.use('/tests', tests);  // Mount test app

// tell express to use bodyParser for interpreting POST requests
app.use(bodyParser.json({ limit: '5mb' }));  // support json bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Support encoded bodies
app.route('/api')
    .get(function(req, res) {
        res.send('Fetch an object');
    })
    .post(function(req, res) {
        var b64;

        b64 = audioMiddleware.loop(req.body);
        res.send(JSON.stringify({'base64': b64}));
    })
    .put(function(req, res) {
        res.send('Update an object');
    });

port = 8080;
app.listen(port);
console.log('Express server started on port %s', port);
