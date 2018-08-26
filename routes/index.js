var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");


//landing page route
router.get("/", function(req, res){
    res.render("landing");
});
// ===================
// AUTH ROUTES
// ===================    

//Show Register Form
router.get("/register", function(req, res) {
    res.render("register");
});

//Handle Sign Up Logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to my exercise " + user.username);
            res.redirect('/campgrounds');
        });
    });
});

//Show Log In Form
router.get("/login", function(req, res) {
    res.render("login");
});

//Handeling Login Logic
router.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect:"/login"}), function(req, res){});

//Log Out Route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You Logged Out!");
    res.redirect("/campgrounds");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

module.exports = router;