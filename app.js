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
//var test = require("./server/ddata.js")
var test = '{"pixel": [{"index":"1","r":"190","g":"85","b":"130","a":"0.5"}], "pixel": [{"index":"2","r":"110","g":"45","b":"90","a":"0.9"}]}';
var parse = JSON.parse(test);

var i = 0;

function loop() {
  setTimeout(function(){

    var b = baudio(function (t) {
        return Math.sin(t * parse.pixel[i].r * Math.PI * parse.pixel[i].g) +
        Math.sin(t * parse.pixel[i].b) * (t % parse.pixel[i].index > parse.pixel[i].a);
    });
    b.play();

    if(i < 10){
      loop();
    }

  }, 3000);
}

var b = baudio(function (t) {
    return Math.sin(t * parse.pixel[i].r * Math.PI * parse.pixel[i].g) +
    Math.sin(t * parse.pixel[i].b) * (t % parse.pixel[i].index > parse.pixel[i].a);
});
b.play();


port = 8080;
app.listen(port);
console.log('Express server started on port %s', port);
