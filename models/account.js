var mongoose = require("mongoose");

// Account schema
var accountSchema = new mongoose.Schema({
    name: String,
    description: String,
    balance: Number
});


module.exports = mongoose.model('Account', accountSchema);
