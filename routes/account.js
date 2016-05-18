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
        'name': name, 'description': description, 'balance': balance
    };
    // create the new account and save it to db
    Account.create(newAccount, function(err, account) {
        if(err) {
            console.log(err);
        } else {
            account.creator.id = req.user._id;
            account.creator.username = req.user.username;
            account.save();
            User.findById(req.user._id, function(err, user) {
                if(err) {
                    console.log(err);
                } else {
                    user.accounts.push(account);
                    user.save();
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
           console.log(err);
       } else {
           account.balance = account.balance + balance;
           console.log(account);
           account.save();
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
           console.log(err);
           res.redirect('/');
       } else {
           if (user.accounts.length == 0) {
               res.redirect('/');
           } else {
            res.render('change', {accounts: user.accounts});    
           }
           
       }
    });
});

module.exports = router;