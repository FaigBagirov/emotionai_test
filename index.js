// Requiring in-built https for creating https server 
const https = require("https"); 
const http = require("http"); 
  
// Express for handling GET and POST request 
const express = require("express"); 
const app = express(); 
  
// Requiring file system to use local files 
const fs = require("fs"); 
  
// Parsing the form of body to take 
// input from forms 
const bodyParser = require("body-parser"); 
const { log } = require("console");
  
// Configuring express to use body-parser 
// as middle-ware 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
  
app.use((req, res, next) => {
  if (req.secure) {
      // Request is already secure (HTTPS)
      console.log("requested is already https");

      next();
  } else {
      // Redirect to HTTPS
      console.log("redirecte3d to https");
      res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

// Get request for root of the app 
app.get("/", function (req, res) { 
  
  console.log("root requested");
  // Sending index.html to the browser 
  res.sendFile(__dirname + "/index2.html"); 

}); 
   
// Post request for geetting input from the form 
app.post("/mssg", function (req, res) { 
  
  // Logging the form body 
  //console.log(req.body); 

  // Redirecting to the root 
  res.redirect("/"); 
}); 
  
// app.all('*', (req, res) => {
//   res.redirect(300, 'https://' + req.headers.host + req.url);
// });



// Creating object of key and certificate 
// for SSL 
const options = { 
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.cert')
}; 
  
// HTTP server (port 80)
http.createServer(app).listen(80, () => {
  console.log('HTTP server listening on port 80');
});

// HTTPS server (port 443)
https.createServer(options, app).listen(443, () => {
  console.log('HTTPS server listening on port 443');
});