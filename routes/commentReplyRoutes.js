const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {makeCommentReply, editCommentReply, deleteCommentReply} = require("../controllers/commentReplyController");


router.post("/makeCommentReply",auth, makeCommentReply);
router.put("/editCommentReply", auth, editCommentReply);
router.delete("/deleteCommentReply/:id", auth, deleteCommentReply)


module.exports = router;