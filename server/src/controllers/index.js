const mongoose = require("mongoose");
const User = mongoose.model("User");
const Transaction = mongoose.model("Transaction");

//get users list
exports.getUsers = (req, res) => {
  User.find({})
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
    });
};

//post Make a transaction -- Add transaction to transaction
exports.makeATransaction = (req, res) => {
  const { user_id, balance } = req.body;
  User.findByIdAndUpdate(
    user_id,
    { $inc: { balance } },
    { new: true, useFindAndModify: false }
  )
    .then((docs) => {
      if (docs) {
        new Transaction({
          user: docs._id,
          transferedFunds: balance,
          newBalance: docs.balance,
          date: new Date(),
        })
          .save()
          .catch((err) => {
            console.log(err);
          });
        res
          .status(200)
          .json(
            balance +
              "$ Added Successfully. Current Balance: " +
              docs.balance +
              "$"
          );
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

//Get Transaction List
exports.getTransactionList = (req, res) => {
  Transaction.find({})
    .populate({
      path: "user",
    })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
    });
};
