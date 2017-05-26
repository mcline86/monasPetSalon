var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    flash    = require("connect-flash"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");



app.use(express.static(__dirname + "/public")); // set default folder to /public

app.use(bodyParser.urlencoded({extended: true})); //body parser for form data
app.set("view engine", "ejs");                  //  Using EJS templates
app.use(methodOverride("_method"));

app.use(require("express-session")({           // Sessions needed for passport integration (later)
  secret: "If you can read this, you shouldn't be here and you know it. . .",// Not you Michael...your cool
  resave: false,
  saveUninitialized: false
}));



app.get("/", function(req, res) {
    res.render("index");
});

app.get("/calendar", function (req, res) {
  res.render("calendar");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/gallery", function(req, res) {
  res.render("gallery");
});

//===================================================
//==================   Listening   ==================
app.listen("8080", "127.0.0.1", function () {
   console.log("The Server has Started!!");
});
