const express = require("express");
const router = express.Router();
const Controller = require('../controllers');
//get users list
router.get("/getUsers",Controller.getUsers);
//post Make a transaction -- Add transaction to transaction
router.post("/makeATransaction",Controller.makeATransaction);
//Get Transaction List
router.get("/getTransactionList",Controller.getTransactionList);
// Get users Transactions
router.get("/getTransactionUserList/:id",Controller.getTransactionUserList);
//Add a new user
router.post("/addAUser",Controller.addAUser);
module.exports = router;