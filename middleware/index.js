//All the Middleware
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

//middleware campground user logged in & own campground
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                //does user own campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();                 
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You Need To Be Logged In To Do That!"); 
        res.redirect("back");
    }
}

//Check comment Ownership middleware
middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){

                res.redirect("back");
            } else {
                //does user own comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();                 
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

//Is Logged in middleware
middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
        }
        req.flash("error", "You Need To Be Logged In To Do That!");
        res.redirect("/login");
};

module.exports = middlewareObj