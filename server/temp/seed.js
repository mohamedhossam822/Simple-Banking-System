const mongoose = require("mongoose");
const database = require("../src/database");
require("../src/models/user");
const user = require ("./users.js");

const seed = async () => {
  try {
    console.log(`[seed] : running...`);
    database.connectDatabase();
    console.log(user);
    for(i=0;i<10;i++){
      console.log(user.user[i]);
      user.user[i].save().catch((err) => {
        console.log(err);
      });
    }
    console.log(`[seed] : success`);
  } catch (error) {
    throw new Error("failed to seed database");
  }
};
seed();
