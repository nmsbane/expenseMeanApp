var express = require("express");
var router = express.Router();
var Account = require("../models/account");
var User = require("../models/user");
var middlewareObj = require("../middleware");


router.post('/', middlewareObj.isLoggedIn, function(req, res) {
    // create a new account based on the form data and 
    var name = req.body.name;
    var description = req.body.description;
    var balance  = req.body.balance;
    var newAccount = {
        'name': name, 'description': description, 'balance': balance, 'creator': {id: req.user._id, username: req.user.username}
    };
    // create the new account and save it to db
    Account.create(newAccount, function(err, account) {
        if(err) {
            req.flash("error", 'An account with the same name already exists');
            console.log(err);
            res.redirect('/');
        } else {
            // account.creator.id = req.user._id;
            // account.creator.username = req.user.username;
            // account.save();
             User.findById(req.user._id, function(err, user) {
                if(err) {
                    req.flash('error', err.message);
                    console.log(err);
                    res.redirect('/');
                } else {
                    user.accounts.push(account);
                    user.save();
                    req.flash('success', 'Account has been added');
                    res.redirect('/');
                }
            })
            
        }
    });
   
});

router.post('/change', middlewareObj.isLoggedIn, function(req, res) {
   // get the id
   var accountId = req.body.accountId;
   var balance = parseInt(req.body.balance);
   
   Account.findById(accountId, function(err, account) {
       if(err) {
            req.flash('error', err.message);
            console.log(err);
            res.redirect('/');           
       } else {
           account.balance = account.balance + balance;
           console.log(account);
           account.save();
           req.flash('success', 'Account has been updated with balance');
       }
   });
   res.redirect('/');
});

router.get('/new', middlewareObj.isLoggedIn, function(req, res) {
   // send a form to create a new account
   res.render('new');
});

router.get('/change', middlewareObj.isLoggedIn, function(req, res) {
    User.findOne({_id: req.user._id}).populate('accounts').exec(function(err, user) {
        if(err)  {
           req.flash('error', err.message);
           console.log(err);
           res.redirect('/');
       } else {
           if (user.accounts.length == 0) {
               req.flash('error', "You dont have any accounts added");
               res.redirect('/');
           } else {
            res.render('change', {accounts: user.accounts});    
           }
           
       }
    });
});

module.exports = router;