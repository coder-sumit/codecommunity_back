const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {makeCommentReply, editCommentReply} = require("../controllers/commentReplyController");


router.post("/makeCommentReply",auth, makeCommentReply);
router.put("/editCommentReply", auth, editCommentReply);


module.exports = router;