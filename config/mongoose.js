const mongoose = require('mongoose');
const { DB_USER, DB_PASS } = require("./index");
const url = `mongodb+srv://${DB_USER}:${DB_PASS}@codecommunity.trkuryg.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  console.log('MongoDB database connection established successfully');
});

module.exports = db;