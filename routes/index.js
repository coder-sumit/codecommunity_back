const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");
const commentReplyRoutes = require("./commentReplyRoutes");
const forumQRoutes = require("./forumQRoutes");
const forumARoutes = require("./forumARoutes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comment", commentRoutes);
router.use("/commentReply", commentReplyRoutes);
router.use("/forumQ", forumQRoutes);
router.use("/forumA", forumARoutes);

module.exports = router;