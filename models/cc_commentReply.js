const mongoose = require("mongoose");

const ccCommentReplySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cc_post'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cc_user'
    },
    target_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cc_user'
    }
},
{
    timestamps: true
});

const CCCommentReply = mongoose.model('cc_comment_reply', ccCommentReplySchemaSchema);
module.exports = CCCommentReply;