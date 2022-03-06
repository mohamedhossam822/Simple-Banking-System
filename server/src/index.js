require('dotenv').config()
const express = require("express");
const app = express();
const database = require('./database');
app.use(express.json());

require("./models/user");
require("./models/transaction");
app.use(require("./routes"));

database.connectDatabase();

app.listen(process.env.PORT);
console.log(`[app]: htttp://localhost:${process.env.PORT}`);