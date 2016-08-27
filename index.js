var http = require('http');
var port = process.env.PORT || 8000;

var server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    var headers = request.headers;

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})
    var ip = request.headers['x-forwarded-for'] ||
     request.connection.remoteAddress ||
     request.socket.remoteAddress ||
     request.connection.socket.remoteAddress;

    var lang = headers['accept-language'].split(',')[0];
    var ua = headers['user-agent'];
    ua = ua.substring(ua.indexOf('(')+1,ua.indexOf(')'));


    var responseBody = {
      ipaddress: ip,
      language: headers['accept-language'].split(',')[0],
      software: ua
    };

    response.write(JSON.stringify(responseBody));
    response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))
  }


});

server.listen(port, function() {
  console.log('Node app is running on port', port);
});
