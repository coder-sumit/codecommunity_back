const { string } = require('joi');
const mongoose = require('mongoose');

const ccUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'O'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  c_kldge: {
    type: String
  }
});

const CCUser = mongoose.model('cc_user', ccUserSchema);

module.exports = CCUser;