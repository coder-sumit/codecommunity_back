const mongoose = require('mongoose');
const { DB_DEV } = require("./index");
const url = DB_DEV;


mongoose.connect(url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  console.log('MongoDB database connection established successfully');
});

module.exports = db;