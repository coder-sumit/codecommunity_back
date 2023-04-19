const mongoose= require("mongoose");

const ccPostSchema = new mongoose.Schema({
  post_caption: {
    type: String,
    required: true
  },
  post_code: {
    type: String
  },
  post_image: {
    type: String
  },
  user_id: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'cc_user'
  },
  post_status: {
    type: String,
    enum: ['public', 'private', 'draft', 'deleted', 'blocked'],
    default: 'public'
  },
  abusive_status: {
    type: Boolean,
    default: false
  }
},{
    timestamps: true
});

const CCPost = mongoose.model("cc_post", ccPostSchema);
module.exports = CCPost;