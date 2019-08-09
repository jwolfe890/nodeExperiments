var http = require("http");
var url = require("url");

function startserver(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    // route(handle, pathname, response);
    request.setEncoding("utf8");

    var personalData = "";

    request.addListener("data", function(chunk) {
      personalData += chunk;
    });

    request.addListener("end", function() {
      route(handle, pathname, response, personalData);
    });
  }
  http.createServer(onRequest).listen(8000);
}

exports.startserver = startserver;
