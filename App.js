var server = require("./server.js");
var routers = require("./routers");
var handler = require("./handler");

var handle = {};
handle["/home"] = handler.home;
handle["/review"] = handler.review;

server.startserver(routers.route, handle);
