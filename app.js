var express = require("express");
var app = express();

app.set('view engine', 'ejs');

// landing page
// app.get('/', function(req, res) {
//     res.render('landing');
// });


app.get('/', function(req, res) {
    var listOfTransactions = [
        {'tag': "Dinner", 'description': 'Dinner bill', 'amount': 100, 'date': 'some date here'},
        {'tag': "lunch", 'description': 'lunch bill', 'amount': 100, 'date': 'some date here'},
        {'tag': "snacks", 'description': 'snacks bill', 'amount': 100, 'date': 'some date here'},
    ];
    
    res.render('transactions', {'transactions': listOfTransactions});
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Expense App has started");
});