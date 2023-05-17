const CCCommentReply = require("../models/cc_commentReply");
const Like = require("../models/cc_like");
const CustomErrorHandler = require("../services/CustomErrorHandler");


const makeCommentReply = async (req, res, next)=>{
try{
    let data = req.body;
    let user = req.user._id;

    if(!(data.post_id && data.comment_id)){
        return next(CustomErrorHandler.invalidInput());
    }

    data.user_id = user;

    let response = await CCCommentReply.create(data);

    return res.status(200).json({
        success: true,
        message: "Commented successfully",
        data: response,
    })
}catch(err){
    return next(err);
}
}

const editCommentReply = async (req, res, next)=>{
    try{
        let data = req.body;
        let user = req.user._id;
    
        if(!data.comment_reply_id){
            return next(CustomErrorHandler.invalidInput());
        }

        let commentReply = await CCCommentReply.findById(data.comment_reply_id);
    
        if(commentReply.user_id != user){
            return next(CustomErrorHandler.unAuthorized());
        }

        delete data.post_id;
        delete data.comment_id;
    
        await CCCommentReply.findByIdAndUpdate(data.comment_reply_id, data);
    
        return res.status(200).json({
            success: true,
            message: "Comment Reply edited"
        });
    }catch(err){
        return next(err);
    }
}

const deleteCommentReply = async (req, res, next)=>{
try{
    let comment_reply_id = req.params.id;
    let user_id = req.user._id;
 
    if(!comment_reply_id){
     return next(CustomErrorHandler.invalidInput());
    }
    // find comment reply
    let comment_reply = await CCCommentReply.findById(comment_reply_id);

    if(!comment_reply){
        return next(CustomErrorHandler.invalidInput());
    }
 
    if(comment_reply.user_id != user_id){
     return next(CustomErrorHandler.invalidInput());
    }
 
    // delete comment_reply and associated likes
    await Like.deleteMany({like_target_type: "comment_reply", like_target_id: comment_reply_id});
    await CCCommentReply.findByIdAndDelete(comment_reply_id);

    return res.status(200).json({
        success: true,
        message: "comment reply deleted!"
    })
}catch(err){
    return next(err);
}

}

module.exports = {makeCommentReply, editCommentReply, deleteCommentReply};