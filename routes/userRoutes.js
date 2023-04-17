const {signUp} = require("../controllers/userController");
const express = require("express");
const router = express.Router();


router.use("/signup", signUp);

module.exports = router;