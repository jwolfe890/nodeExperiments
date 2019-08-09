function route(handle, pathname, response, personalData) {
  console.log("this is the pathname " + pathname);

  if (typeof handle[pathname] === "function") {
    handle[pathname](response, personalData);
  } else {
    console.log("No handler for " + pathname);
  }
}

exports.route = route;
