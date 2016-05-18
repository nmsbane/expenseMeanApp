var mongoose = require("mongoose");

var tagSchema = new mongoose.Schema({
    name: String,
    creator: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});


module.exports = mongoose.model('Tag', tagSchema);
