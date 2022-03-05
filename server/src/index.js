require('dotenv').config()
const express = require("express");

const app = express();


// Routes
app.use(require("./routes"));


app.listen(process.env.PORT);
console.log(`[app]: htttp://localhost:${process.env.PORT}`);