var express, cors, app, server, io, bodyParser, audioMiddleware, env, port, socketPort;

express = require('express');
cors = require('cors');
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);
bodyParser = require('body-parser');
audioMiddleware = require('./server/middleware/audio');

// enable if you have problems with Socket.IO but I cannot promise anything.
RUNNING_SOCKETIO = false

if (RUNNING_SOCKETIO) {
    app.use(cors());
    app.use(function(req, res, next) {
        console.log("Query for socket.io", process.env);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}
    

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

        b64 = audioMiddleware.image2sound(req.body, io);
        res.send(JSON.stringify({'base64': b64}));
    })
    .put(function(req, res) {
        res.send('Update an object');
    });

port = 8080;
app.listen(port);

if (RUNNING_SOCKETIO) {
    socketPort = 4343;

    // io.set("origins", "*");
    // io.set("transports", ["polling", "websocket", "xhr-polling"]);
    io.on('connection', function() {
        console.log('Hello, socket.io!');
    });
    server.listen(socketPort);
    console.log('Socket server started on port %s', socketPort);
}
console.log('Express server started on port %s', port);
