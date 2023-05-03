const dotenv = require("dotenv");
dotenv.config();

const {APP_PORT, DB_PASS, DB_USER, USER_COLLECTION, DEBUG_MODE, JWT_SECRET} = process.env;

module.exports = {APP_PORT, DB_PASS, DB_USER, USER_COLLECTION, DEBUG_MODE, JWT_SECRET};