const mongoose = require("mongoose");
const User = mongoose.model("User");
const Transaction = mongoose.model("Transaction");

//get users list
exports.getUsers = (req, res) => {
  User.find({})
    .populate({
      path: "transactions",
    })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
    });
};

//post Make a transaction -- Add transaction to transaction
exports.makeATransaction = async (req, res) => {
  const { user_id, balance } = req.body;
  //Update the balance of the user
  const updatedUser = await User.findByIdAndUpdate(
    user_id,
    { $inc: { balance } },
    { new: true, useFindAndModify: false }
  ).catch((err) => {
    console.log(err);
    return res.status(400).json(err);
  });

  //Make a new transaction
  const newTransaction = await new Transaction({
    user: updatedUser._id,
    transferedFunds: balance,
    newBalance: updatedUser.balance,
    date: new Date(),
  })
    .save()
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });

  //Add the new transaction to the user profile
  await User.findByIdAndUpdate(
    user_id,
    { $push: { transactions: newTransaction._id } },
    { new: true, useFindAndModify: false }
  ).catch((err) => {
    console.log(err);
    return res.status(400).json(err);
  });

  res.status(200).json({
    message:
      balance +
      "$ Added Successfully. Current Balance: " +
      updatedUser.balance +
      "$",
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

exports.getTransactionUserList = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .populate({ path: "transactions" })
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addAUser = (req, res) => {
  console.log(req.body);
  const user = {
    name: req.body.name,
    email: req.body.email,
    balance: req.body.balance,
  };
  new User(user)
    .save()
    .then(() => {
      res.status(200).json({
        message: req.body.name + " added to clients successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
