const CCComment = require("../models/cc_comment");
const CCCommentReply = require("../models/cc_commentReply");
const Like = require("../models/cc_like");
const CustomErrorHandler = require("../services/CustomErrorHandler");


const makeComment = async (req, res, next)=>{
try{
    let data = req.body;
    let user = req.user._id;

    if(!data.post_id){
        return next(CustomErrorHandler.invalidInput());
    }

    data.user_id = user;

    let response = await CCComment.create(data);

    return res.status(200).json({
        success: true,
        message: "Commented successfully",
        data: response,
    })
}catch(err){
    return next(err);
}
}

const editComment = async (req, res, next)=>{
    try{
        let data = req.body;
        let user = req.user._id;
    
        if(!data.comment_id){
            return next(CustomErrorHandler.invalidInput());
        }

        let comment = await CCComment.findById(data.comment_id);
    
        if(comment.user_id != user){
            return next(CustomErrorHandler.unAuthorized());
        }

        delete data.post_id;
    
        await CCComment.findByIdAndUpdate(data.comment_id, data);
    
        return res.status(200).json({
            success: true,
            message: "Comment edited"
        });
    }catch(err){
        return next(err);
    }
}

const deleteComment = async(req, res, next)=>{
   try{
    let comment_id = req.params.id;
    let user_id = req.user._id;

    if(!comment_id){
        return next(CustomErrorHandler.invalidInput());
    }

    // find the comment
    let comment = await CCComment.findById(comment_id);

    if(comment.user_id != user_id){
        return next(CustomErrorHandler.unAuthorized());
    }

    // find all comment replies associated with comment
    let commentReplies = await CCCommentReply.find({comment_id,});

    // delete all likes associated with comment replies
    await Promise.all(
       commentReplies.map(async(comment_reply)=>{
       await Like.deleteMany({like_target_type: "comment_reply", like_target_id: comment_reply._id});
       await CCCommentReply.findByIdAndDelete(comment_reply._id);
    })
    )

    // delete comment and associated likes
    await Like.deleteMany({like_target_type: "comment", like_target_id: comment_id});
    await CCComment.findByIdAndDelete(comment_id);


    return res.status(200).json({
        success: true,
        message: "comment removed!"
    });
   }catch(err){
     return next(err);
   }
}

module.exports = {makeComment, editComment, deleteComment};