var mongoose = require("mongoose");
// transaction schema
var transactionSchema = new mongoose.Schema({
   account: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Account"
   },
   creator: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
   description: String,
   expenseAmount: Number,
   dateAdded: Date
   
});

transactionSchema.pre('save', function(next){
  var now = new Date();
  this.dateAdded = now.toDateString();
  next();
});


module.exports = mongoose.model('Transaction', transactionSchema);

