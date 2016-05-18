var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get('/register', function(req, res) {
    res.render('register');
});

// Sign Up new user
router.post('/register', function(req, res) {
   var newUser = new User({username: req.body.username}) ;
   User.register(newUser, req.body.password, function(err, user) {
      if(err)  {
          res.redirect('register');
      } else {
          passport.authenticate("local")(req, res, function() {
              res.redirect('/');
          })
      }
   });
});

// show the login form when user visits /login
router.get('/login', function(req, res) {
   res.render('login') ;
});

// handle the post request from the login page
router.post('/login', passport.authenticate("local", 
    {
        successRedirect: '/',
        failureRedirect: '/auth/login'
    }
), function(req, res) {
    
});

// logout link
router.get('/logout', function(req, res) {
   req.logout();
   req.flash("success", "successfully logged out");
   res.redirect('/');
});



module.exports = router;