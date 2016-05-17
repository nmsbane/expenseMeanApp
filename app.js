var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


// connect to local mongodb, database is expenseApp
mongoose.connect('mongodb://localhost/expenseApp');

// tell app to use bodyparser
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

// Account schema
var accountSchema = new mongoose.Schema({
    name: String,
    description: String,
    balance: Number
});


var Account = mongoose.model('Account', accountSchema);

var tagSchema = new mongoose.Schema({
    name: String
});

var Tag = mongoose.model('Tag', tagSchema);

// transaction schema
var transactionSchema = new mongoose.Schema({
   account: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Account"
   },
   description: String,
   expenseAmount: Number,
   dateAdded: Date
   
});


var Transaction = mongoose.model('Transaction', transactionSchema);

transactionSchema.pre('save', function(next){
  var now = new Date();
  this.dateAdded = now.toDateString();
  next();
});


app.get('/', function(req, res) {
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

app.get('/new', function(req, res) {
    Account.find({}, function(err, accounts) {
       if(err) {
           console.log(err);
       } else {
           res.render('newTransaction', {accounts: accounts});
       }
   })
});

app.post('/new', function(req, res) {
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


app.post('/account', function(req, res) {
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

app.post('/account/change', function(req, res) {
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

app.get('/account/new', function(req, res) {
   // send a form to create a new account
   res.render('new');
});

app.get('/account/change', function(req, res) {
   Account.find({}, function(err, accounts) {
       if(err) {
           console.log(err);
       } else {
           res.render('change', {accounts: accounts});
       }
   }) 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Expense App has started");
});