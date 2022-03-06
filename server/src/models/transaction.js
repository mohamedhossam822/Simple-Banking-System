//jshint esversion:8
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  transferedFunds: {
    type: Number,
    required: true,
  },
  newBalance:{
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

mongoose.model("Transaction", transactionSchema);
