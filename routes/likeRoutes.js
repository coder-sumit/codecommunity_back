const express = require("express");
const router = express.Router();
const {toggleLike} = require("../controllers/likeControllers");
const auth = require("../middlewares/auth");

router.post("/toggleLike", auth, toggleLike);

module.exports = router;