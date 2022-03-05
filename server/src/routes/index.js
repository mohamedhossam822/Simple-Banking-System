const express = require("express");
const router = express.Router();
const Controller = require('../controllers');
router.get("/",Controller.HelloGet);
//get users list

//post Make a transaction -- Add transaction to transaction

//Get Transaction List
module.exports = router;