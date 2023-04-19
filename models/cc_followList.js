const mongoose = require("mongoose");

const ccFollowSchema = new mongoose.Schema({
  main_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cc_user'
  },
  fl_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cc_user'
  }
},{
    timestamps: true
});

const CCFollowList = mongoose.model('cc_follow_list', ccFollowSchema);
module.exports = CCFollowList;