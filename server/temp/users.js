const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.user = [
  new User({
    name: "Mohamed Hossam",
    email: "mohamedhossam@hotmail.com",
    balance: 0,
  }),
  new User({
    name: "Hossam Ouda",
    email: "hossamOuda@hotmail.com",
    balance: 0,
  }),
  new User({
    name: "Hudson Snow",
    email: "HudsonSnow@hotmail.com",
    balance: 0,
  }),
  new User({
    name: "Kieren Mcgowan",
    email: "KierenMcgowan@hotmail.com",
    balance: 0,
  }),
  new User({
    name: "April Tucker",
    email: "AprilTucker@hotmail.com",
    balance: 0,
  }),
  new User({ name: "Alaw Mays", email: "AlawMays@hotmail.com", balance: 0 }),
  new User({
    name: "Alisa Weiss",
    email: "AlisaWeiss@hotmail.com",
    balance: 0,
  }),
  new User({
    name: "Santiago Ashton",
    email: "SantiagoAshton@hotmail.com",
    balance: 0,
  }),
  new User({
    name: "Dorian Peterson",
    email: "DorianPeterson@hotmail.com",
    balance: 0,
  }),
  new User({ name: "Warren Guy", email: "WarrenGuy@hotmail.com", balance: 0 }),
];
