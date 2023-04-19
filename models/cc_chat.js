const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
   chat_sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cc_user'
   },
   chat_receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cc_user'
   },
   chat_text: {
    type: String,
    required: true
   }
},
{
    timestamps: true
});

const CCChat = mongoose.model('cc_chat', CCChat);
module.exports = CCChat;