const mongoose = require('mongoose');

const ccUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  github_url: {
    type: String
  },
  insta_id: {
    type: String
  },
  gmail: {
    type: String
  },
  profile_pic: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: String
  },
  mobile: {
    type: String,
    unique: true
  },
  code_kldge: {
    type: String
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'O']
  },
  user_status: {
    type: String,
    enum: ['baned', 'active'],
    default: 'active'
  },
  user_role: {
    type: String,
    enum: ['admin', 'sub_admin', 'user'],
    default: 'user'
  }
},{
  timestamps: true
});

const CCUser = mongoose.model('cc_user', ccUserSchema);

module.exports = CCUser;