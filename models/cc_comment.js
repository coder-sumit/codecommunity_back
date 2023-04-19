const mongoose = require("mongoose");

const ccCommentSchema = new mongoose.Schema({
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
    }
},
{
    timestamps: true
});

const CCComment = mongoose.model('cc_comment', ccCommentSchema);
module.exports = CCComment;