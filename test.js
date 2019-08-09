var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");

var handle = {};
handle["/"] = hi;
handle["/personal"] = personal;

function hi(response) {
  var htmlFile =
    "<html>" +
    "<head>" +
    '<meta http-equiv="Content-Type" content="text/html;charset="UTF-8" />' +
    "</head>" +
    "<body>" +
    '<form action="/personal" method="post">' +
    '<input type="text" name="fname" />first name<br />' +
    '<input type="number" name="age" />age<br />' +
    '<input type="text" name="Sname" />last name<br />' +
    "<button>Save</button>" +
    "</form>" +
    "</body>" +
    "</html>";

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(htmlFile);
  response.end();
}

function personal(response, personalData) {
  var data3 = querystring.parse(personalData);

  console.log(data3);

  fs.writeFile("newfile.txt", JSON.stringify(data3), function(err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
  response.end();
}

function startServer(route, handle) {
  function onRequest(request, response) {
    var personalData = "";
    var pathname = url.parse(request.url).pathname;
    request.setEncoding("utf8");

    request.addListener("data", function(chunk) {
      personalData += chunk;
    });

    request.addListener("end", function() {
      route(handle, pathname, response, personalData);
    });
  }

  http.createServer(onRequest).listen(8080);
}

function route(handle, pathname, response, personalData) {
  if (typeof handle[pathname] === "function") {
    handle[pathname](response, personalData);
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("404 Page not Found");
    response.end();
  }
}

startServer(route, handle);
