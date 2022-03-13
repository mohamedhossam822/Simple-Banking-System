//jshint esversion:8
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  transactions: [{ type: mongoose.ObjectId, ref: "Transaction" }],
});

mongoose.model("User", userSchema);
