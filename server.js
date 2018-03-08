// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Comment = require("./models/Comment.js");
// var Article = require("./models/Article.js");

// Set up port
var PORT = process.env.PORT || 3000;

// Set up Express App
var app = express();

// Require routes
var routes = require("./routes");

// Designate our public folder as a static directory
app.use(express.static("public"));

// Connect Handlebars to Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Have every request go through route middleware
app.use(routes);

// Use the deployed database or local
var databaseUri="mongodb://localhost/mongoHeadlines"

if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI);
}else{
  mongoose.connect(databaseUri);
}

// Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
// });

var db = mongoose.connection;

db.on("error",function(err){
  console.log("Mongoose Error: ", err);
});
db.once("open",function(){
  console.log("Mongoose connection successful.");
});


// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});