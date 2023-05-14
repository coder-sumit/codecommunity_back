const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {makeComment, editComment} = require("../controllers/commentController"); 


router.post("/makeComment",auth, makeComment);
router.put("/editComment", auth, editComment);


module.exports = router;