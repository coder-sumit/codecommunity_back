const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cc_post'
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cc_comment'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cc_user'
    }
},
{
    timestamps: true
});

const CCCommentReply = mongoose.model('cc_comment_reply', Schema);
module.exports = CCCommentReply;