var express = require("express");
var router = express.Router();
var Account = require("../models/account");
var User = require("../models/user");
var Tag = require("../models/tag");
var Transaction = require("../models/transaction");
var middlewareObj = require("../middleware");


router.get('/', middlewareObj.isLoggedIn, function(req, res) {
    User.findOne({_id: req.user._id}).populate('transactions').exec(function(err, user){
       if(err)  {
           req.flash('error', err.message);
           console.log(err);
           res.redirect('/');
       } else {
           res.render('transactions', {transactions: user.transactions});
       }
    });
});

router.get('/new', middlewareObj.isLoggedIn, function(req, res) {
    User.findOne({_id: req.user._id}).populate('accounts').populate('tags').exec(function(err, user) {
        if(err) {
           req.flash('error', err.message);
           console.log(err);
           res.redirect('/');
       } else {
           res.render('newTransaction', {accounts: user.accounts, tags: user.tags});
       }
    });
});

router.post('/new', middlewareObj.isLoggedIn, function(req, res) {
    var accountId = req.body.accountId;
    var expense = parseInt(req.body.expense);
    var description = req.body.description;
    var tagName = req.body.tag;
    
    User.findById(req.user._id, function(err, user) {
       if(err)  {
           req.flash('error', err.message);
           console.log(err);
           res.redirect('/');
       } else {
           Account.findById(accountId, function(err, account) {
           if(err)  {
               req.flash('error', err.message);
               console.log(err);
               res.redirect('/');
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
                        req.flash('error', err.message);
                        console.log(err);
                        res.redirect('/');
                    } else {
                        Tag.findOne({
                            name: tagName
                        }, function(err,tag) {
                            if(tag == null) {
                                // tag does not exist, so create it
                                Tag.create({
                                    name: tagName,
                                    creator: {
                                        id: req.user._id,
                                        username: req.user.username
                                    }
                                }, function(err, tag) {
                                    if(err) {
                                        req.flash('error', err.message);
                                        console.log(err);
                                        res.redirect('/');
                                    } else {
                                        user.tags.push(tag);
                                        transaction.tag = tag;
                                        
                                        transaction.creator.id = req.user._id;
                                        transaction.creator.username = req.user.username;
                                        user.transactions.push(transaction);
                                        user.save();
                                        transaction.save();
                                        req.flash('success', 'Added the expense');
                                        res.redirect('/')
                                    }
                                    
                                });
                            } else {
                                transaction.creator.id = req.user._id;
                                transaction.creator.username = req.user.username;
                                transaction.tag = tag;
                                transaction.save();
                                user.transactions.push(transaction);
                                user.save();
                                console.log(transaction);
                                req.flash('success', 'Added the expense');
                                res.redirect('/');
                            }
                        })
                        
                    }
                }
                );
           };
    });
    }
    });
    
});

module.exports = router;
