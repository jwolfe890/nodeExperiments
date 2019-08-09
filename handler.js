var querystring = require("querystring");

function home(response) {
  var htmlfile = `
    <!doctype html>  
    <html>  
    <head>
    <meta http-equiv="Content-Type" content="text/html;charset="UTF-8" />
    </head>
    <body> 
        <form action="/review" method="post"> 
        <input type="text" name="fname" />first name<br /> 
        <input type="text" name="Sname" />last name<br /> 
        <button>Save</button>  </form> 
     </body>  
     </html>
    `;
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(htmlfile);
  response.end();
}

function review(response, personalData) {
  var data = querystring.parse(personalData);
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(`Hello ${data.fname}. Welcome to hell.`);
  response.end();
}

exports.home = home;
exports.review = review;
