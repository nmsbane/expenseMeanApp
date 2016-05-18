var express = require("express");
var router = express.Router();
var Account = require("../models/account");


router.post('/', function(req, res) {
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
            res.redirect('/');
        }
    });
   
});

router.post('/change', function(req, res) {
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

router.get('/new', function(req, res) {
   // send a form to create a new account
   res.render('new');
});

router.get('/change', function(req, res) {
   Account.find({}, function(err, accounts) {
       if(err) {
           console.log(err);
       } else {
           res.render('change', {accounts: accounts});
       }
   }) 
});

module.exports = router;