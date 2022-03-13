require('dotenv').config()
const express = require("express");
const app = express();
const database = require('./database');
const path = require("path")
app.use(express.json());

require("./models/user");
require("./models/transaction");
app.use(require("./routes"));
app.use(express.static(path.join(__dirname, "client", "build")))

database.connectDatabase();

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(process.env.PORT);
console.log(`[app]: htttp://localhost:${process.env.PORT}`);