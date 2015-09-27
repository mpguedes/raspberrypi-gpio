var http = require('http');
var jade = require('jade');

function parseUrl(url) {
	return url.substr(1);
}

function go() {
   console.log('Running command go');
}

function back() {
    console.log('Running command back');
}

function left(){
    console.log('Running command left');
}

function right() {
    console.log('Running command right');
}

function stop() {
    console.log('Running command stop');
}

var commands = ['go','back','left','right','stop',];

http.createServer(function (req, res) {
    var command = parseUrl(req.url);
    if(commands.indexOf(command) >= 0){
        eval(command+'()');
    } else {
        console.log('Invalid command ' + command);
    }



  res.writeHead(200, {'Content-Type': 'text/html'});

	var fn = jade.compileFile('robot.jade', function(){});
	var html = fn({"commandName": command});
	res.write(html);
  res.end('\n');
}).listen(1337, "0.0.0.0");

console.log('Server running at http://0.0.0.0:1337/');
