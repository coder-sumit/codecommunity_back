const dotenv = require("dotenv");
dotenv.config();



const {APP_PORT, DB_PASS, DB_USER} = process.env;
module.exports = {APP_PORT, DB_PASS, DB_USER};