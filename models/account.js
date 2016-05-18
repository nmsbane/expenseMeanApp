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


module.exports = mongoose.model('Account', accountSchema);
