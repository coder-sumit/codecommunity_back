const CCComment = require("../models/cc_comment");
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

module.exports = {makeComment, editComment};