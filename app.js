var express         = require("express"),
    app             = express(),
//body-pareser to be able to get the user input
    bodyParser      = require("body-parser"),
//declare mongoose
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
//declare oreride method    
    methodOverride  = require("method-override"),
//get the campground model
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
//User = require("./models/comment");
    seedDB          = require("./seeds"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local");

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");
    
//use custom stylesheet
app.use(express.static(__dirname + "/public"));
    
// seedDB(); //seed the database
//connect mongoose
mongoose.connect("mongodb://localhost/yelp_camp");
//use body parser
app.use(bodyParser.urlencoded({extended: true}));

//set default file tipe to EJS
app.set("view engine", "ejs");

//Method overide
app.use(methodOverride("_method"));
//Use Flash
app.use(flash());
//Use Moments for time keeping (comments)
app.locals.moment = require('moment');

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"potato test",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//use GetUser
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Is UP!!!");
});