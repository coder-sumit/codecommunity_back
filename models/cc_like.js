const mongoose = require("mongoose");

const ccLikeSchema = new mongoose.Schema({
  like_target_type: {
    type: String,
    enum: ['post', 'user', 'comment', 'forum_q', 'forum_a', 'comment_reply'],
    required: true
  },
  like_target_id: {
    type: String,
    required: true
  },
  like_user_id: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'cc_user'
  }
}, {
    timestamps: true
});

const CCLike = mongoose.model('cc_like', ccLikeSchema);
module.exports = CCLike;