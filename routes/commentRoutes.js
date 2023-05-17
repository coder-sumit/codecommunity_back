const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {makeComment, editComment, deleteComment} = require("../controllers/commentController"); 


router.post("/makeComment",auth, makeComment);
router.put("/editComment", auth, editComment);
router.delete("/deleteComment/:id", auth, deleteComment);


module.exports = router;