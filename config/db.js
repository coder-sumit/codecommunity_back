const DbConnector = require("../services/dbConnector");
const {DB_USER, DB_PASS} = require("./index");
const url = `mongodb+srv://${DB_USER}:${DB_PASS}@codecommunity.trkuryg.mongodb.net/?retryWrites=true&w=majority`;

console.log(url);

let db = DbConnector(url, "codecommunity");

module.exports = db;
