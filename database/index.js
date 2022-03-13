require('dotenv').config()
const mongoose = require('mongoose');

exports.connectDatabase = () => {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/Banking_System`;
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
  });

  mongoose.connection.on("error", (err) => {
    console.log("error connecting to mongo", err);
  });
};
