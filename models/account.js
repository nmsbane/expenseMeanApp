var mongoose = require("mongoose");

// Account schema
var accountSchema = new mongoose.Schema({
    name: String,
    description: String,
    balance: Number,
    creator: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});
// create composite primary key 
// a single user cant have duplicate account name 
accountSchema.index({ name: 1, creator: 1}, { unique: true });


module.exports = mongoose.model('Account', accountSchema);
