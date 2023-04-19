const mongoose = require("mongoose");

const ccForumSchema = new mongoose.Schema({
   a_user_id: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'cc_user'
   },
   a_caption: {
    type: String,
    required: true
   },
   a_code: {
    type: String
   },
   a_image: {
    type: String
   },
   a_status: {
    type: String,
    enum: ['public', 'private', 'draft', 'deleted', 'blocked'],
    default: 'public'
  }
}, {
    timestamps: true
});

const CCForumA = mongoose.model('cc_forum_a', ccForumSchema);
module.exports = CCForumA;