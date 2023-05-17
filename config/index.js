const dotenv = require("dotenv");
dotenv.config();

LIKE_TYPES = ['post', 'user', 'comment', 'forum_q', 'forum_a', 'comment_reply'];

const {APP_PORT,DB_DEV, USER_COLLECTION, DEBUG_MODE, JWT_SECRET} = process.env;

module.exports = {APP_PORT,DB_DEV, USER_COLLECTION, DEBUG_MODE, JWT_SECRET, LIKE_TYPES};