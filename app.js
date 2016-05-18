var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Account = require("./models/account");
var Tag = require("./models/tag");
var Transaction = require("./models/transaction");
var AccountRoutes = require("./routes/account.js");
var TransactionRoutes = require("./routes/transaction.js");
var AuthRoutes = require("./routes/user.js");

// connect to local mongodb, database is expenseApp
mongoose.connect('mongodb://localhost/expenseApp');

// tell app to use bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', TransactionRoutes);
//app.use('/user', AuthRoutes);
app.use('/account', AccountRoutes);



app.set('view engine', 'ejs');


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Expense App has started");
});