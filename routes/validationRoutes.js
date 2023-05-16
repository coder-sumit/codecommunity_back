const express = require("express");
const router = express.Router();
const {emailExist, mobileExist, usernameExists} = require("../controllers/validationController");

router.get("/emailExists/:id", emailExist);
router.get("/mobileExists/:id", mobileExist);
router.get("/usernameExists/:id", usernameExists);

module.exports = router;