var express, app, server, io, bodyParser, audioMiddleware, env, port;

express = require('express');
app = express();
server = require('http').Server(app);
io = require('socket.io')(server);
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
app.use(bodyParser.json({ limit: '5mb' }));  // support json bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Support encoded bodies
app.route('/api')
    .get(function(req, res) {
        res.send('Fetch an object');
    })
    .post(function(req, res) {
        var b64;

        b64 = audioMiddleware.loop(req.body, io);
        res.send(JSON.stringify({'base64': b64}));
    })
    .put(function(req, res) {
        res.send('Update an object');
    });

port = 8080;
app.listen(port);

io.on('connection', function() {
    console.log('Hello, socket.io!');
});
server.listen(7777);

console.log('Express server started on port %s', port);
