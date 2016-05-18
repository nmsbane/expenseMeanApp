var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    accounts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account"
        }
    ],
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        }
    ],
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }
    ]
});

// create primary key 
// username is unique
UserSchema.index({ username: 1}, { unique: true });


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);