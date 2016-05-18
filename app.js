var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");
var Account = require("./models/account");
var Tag = require("./models/tag");
var Transaction = require("./models/transaction");
var AccountRoutes = require("./routes/account.js");
var TransactionRoutes = require("./routes/transaction.js");
var AuthRoutes = require("./routes/user.js");

// connect to local mongodb, database is expenseApp
mongoose.connect('mongodb://localhost/expenseApp');


// set up app to use passport
app.use(require("express-session")({
    secret: "A secret key",
    resave: false,
    saveUninitialized: false
}));


// configure passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// tell app to use bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// middleware to put the currentUser in every response local variables
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// routes
app.use('/', TransactionRoutes);
app.use('/auth', AuthRoutes);
app.use('/account', AccountRoutes);



app.set('view engine', 'ejs');


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Expense App has started");
});