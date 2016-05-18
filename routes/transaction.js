var express = require("express");
var router = express.Router();
var Account = require("../models/account");
var Transaction = require("../models/transaction");
var middlewareObj = require("../middleware");


router.get('/', middlewareObj.isLoggedIn, function(req, res) {
    var listOfTransactions = [
        {'tag': "Dinner", 'description': 'Dinner bill', 'amount': 100, 'date': 'some date here'},
        {'tag': "lunch", 'description': 'lunch bill', 'amount': 100, 'date': 'some date here'},
        {'tag': "snacks", 'description': 'snacks bill', 'amount': 100, 'date': 'some date here'},
        {'tag': "Dinner", 'description': 'Dinner bill', 'amount': 100, 'date': 'some date here'},
        {'tag': "lunch", 'description': 'lunch bill', 'amount': 100, 'date': 'some date here'},
        {'tag': "snacks", 'description': 'snacks bill', 'amount': 100, 'date': 'some date here'},
        {'tag': "Dinner", 'description': 'Dinner bill', 'amount': 100, 'date': 'some date here'},
        {'tag': "lunch", 'description': 'lunch bill', 'amount': 100, 'date': 'some date here'},
        {'tag': "snacks", 'description': 'snacks bill', 'amount': 100, 'date': 'some date here'},

    ];
    
    res.render('transactions', {transactions: listOfTransactions});
});

router.get('/new', middlewareObj.isLoggedIn, function(req, res) {
    Account.find({}, function(err, accounts) {
       if(err) {
           console.log(err);
       } else {
           res.render('newTransaction', {accounts: accounts});
       }
   })
});

router.post('/new', middlewareObj.isLoggedIn, function(req, res) {
    var accountId = req.body.accountId;
    var expense = parseInt(req.body.expense);
    var description = req.body.description;
    
    Account.findById(accountId, function(err, account) {
       if(err)  {
           console.log(err);
       } else {
           account.balance = account.balance - expense;
           console.log(account);
           account.save();
           Transaction.create({
               account: account,
               expenseAmount: expense,
               description: description
            }, function(err, transaction) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(transaction);
                }
            });
            res.redirect('/');
       }
    });
    
});

module.exports = router;
