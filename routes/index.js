const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");
const commentReplyRoutes = require("./commentReplyRoutes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comment", commentRoutes);
router.use("/commentReply", commentReplyRoutes);
module.exports = router;