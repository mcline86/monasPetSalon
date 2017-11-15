var express        = require("express"),
    app            = express(),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    flash          = require("connect-flash"),
    bodyParser     = require("body-parser"),
    Appointment    = require("./models/appointment"),
    Image          = require("./models/image"),
    Logon          = require("./models/logon"),
    methodOverride = require("method-override");



mongoose.connect("mongodb://localhost/mona");

var basic = require("./routes/index"),
    admin = require("./routes/admin"),
    api   = require("./routes/api");


app.use(express.static(__dirname + "/public")); // set default folder to /public

app.use(bodyParser.urlencoded({extended: true})); //body parser for form data
app.set("view engine", "ejs");                  //  Using EJS templates
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({           // Sessions needed for passport integration (later)
  secret: "If you can read this, you shouldn't be here and you know it. . .",// Not you Michael...your cool
  resave: false,
  saveUninitialized: false
}));

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.info = req.flash("info");
   next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Logon.authenticate()));
passport.serializeUser(Logon.serializeUser());
passport.deserializeUser(Logon.deserializeUser());

app.get("/", function (req, res) {
  Image.find({inSlider: true}, function(err, images) {
    if(err){
      console.log(err);
    }else {
      console.log(images);
      res.render("index", {images: images});
    }
  });
});

app.get("/calendar", function (req, res) {
  res.render("calendar");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/gallery", function (req, res) {
  Image.find({inGallery: true}, function(err, images) {
    if(err){
      console.log(err);
    }else {
      res.render("gallery", {images: images});
    }
  });
});

app.get("/image/:id", api.getImageInfo);

//===================================================
//==============   Appointment Crud     =============
//===================================================

app.post("/newAppointment", basic.newAppointment);

//===================================================
//==============     Admin Routes       =============
//===================================================

app.get("/admin",isLoggedIn, admin.cp);

app.post("/login", passport.authenticate("local",
  {
    successRedirect: "/admin",
    failureRedirect: "back",
    failureFlash: true
  }), function(req, res) { //callback not used as passport will redirect

});

app.post("/admin/upload", admin.upload);

app.post("/admin/updateImage/:id", isLoggedIn, admin.updateImage);

app.get("/admin/calendar", admin.calPage); //admin calendar route
app.get("/admin/pending", admin.pending); //appointment manager

app.get("/admin/gallery", admin.gallery);

app.get("/logout", function(req, res) {
  req.logout();
  res.render("index");
});


//===================================================
//==================   Listening   ==================
//===================================================

app.listen("80",  function () {
   console.log("The Server has Started!!");
   Logon.findOne({username: "mike"}, function(err, usr) {
     if(err){
       console.log("err");
     }
     else {
       if(usr == null) {
         var mike = new Logon({username: "mike"});
         Logon.register(mike,"password", function(err, me) {
           if(err){
             console.log(err);
           }
           else {
             console.log(me);
           }
         })
       }
     }
   });
});


//===================================================
//==================   MiddleWare   =================
//===================================================

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  }
  else {
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/");
  }
}
