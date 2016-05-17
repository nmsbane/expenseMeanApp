var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// tell app to use bodyparser
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

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
    
    res.render('transactions', {'transactions': listOfTransactions});
});


app.post('/account', function(req, res) {
    // create a new account based on the form data and 
    var name = req.body.name;
    var description = req.body.description;
    var balance  = req.body.balance;
    var newAccount = {
        'name': name, 'description': description, 'balance': balance
    };
    // temporarly store it in an accounts array
   res.redirect('/');
});

app.get('/account/new', function(req, res) {
   // send a form to create a new account
   res.render('new');
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Expense App has started");
});