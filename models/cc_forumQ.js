const mongoose = require("mongoose");

const ccForumSchema = new mongoose.Schema({
   q_user_id: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'cc_user'
   },
   q_caption: {
    type: String,
    required: true
  },
  q_code: {
    type: String
  },
  q_image: {
    type: String
  },
  q_status: {
    type: String,
    enum: ['public', 'private', 'draft', 'deleted', 'blocked'],
    default: 'public'
  }
}, {
    timestamps: true
});

const CCForumQ = mongoose.model('cc_forum_q', ccForumSchema);
module.exports = CCForumQ;