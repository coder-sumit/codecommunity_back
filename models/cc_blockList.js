const mongoose = require("mongoose");

const ccBlockSchema = new mongoose.Schema({
  main_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cc_user'
  },
  bl_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cc_user'
  }
},{
    timestamps: true
});

const CCBlockList = mongoose.model('cc_block_list', ccBlockSchema);
module.exports = CCBlockList;