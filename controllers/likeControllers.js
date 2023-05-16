const Like = require("../models/cc_like");
const CustomErrorHandler = require("../services/CustomErrorHandler");

const toggleLike = async(req, res, next)=>{
try{
    let data = req.body;
    let checkArr = ['post', 'user', 'comment', 'forum_q', 'forum_a', 'comment_reply'];
    data.like_user_id = req.user._id;
 
    if(checkArr.indexOf(data.like_target_type) == -1 || !data.like_target_id){
        return next(CustomErrorHandler.invalidInput());
    }
 
    let liked = false;
 
    // check for liked or not
    let isLiked = await Like.findOne({
     like_target_type: data.like_target_type,
     like_target_id: data.like_target_id,
     like_user_id: data.like_user_id
    });
 
 
    if(isLiked){
      await Like.findByIdAndRemove(isLiked._id);
    }else{
      await Like.create(data);
      liked = true;
    }
 
    return res.status(200).json({
     success: true,
     liked,
    });
}catch(err){
    return next(err);
}
}

module.exports = {toggleLike};