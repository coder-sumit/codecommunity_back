const CCPost = require("../models/cc_post");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const fs = require("fs");
const post = async (req, res, next)=>{
  try{
   let data = JSON.parse(req.body.data);
   let filename = req.file?.filename;
   let user = req.user._id;

   if(filename){
    data.post_image = `images/${filename}`;
   }
   data.user_id = user;

   if(!(data.post_caption || data.filename || data.post_code)){
    fs.unlink(data.post_image);
    return next(CustomErrorHandler.invalidInput());
   }

  
    let resPost = await CCPost.create(data);

    return res.status(200).json({
        success: true,
        message: "posted successfully",
        post: resPost
    });
   }catch(err){
    return next(err);
   }
}

const editPost = async(req, res, next)=>{
   try{
    let data = JSON.parse(req.body.data);
    let filename = req.file?.filename;
    let user = req.user._id;
    // get post 
    let post = await CCPost.findById(data.post_id);
    if(!post){
        return next(CustomErrorHandler.invalidInput());
    }
    if(post.user_id != user){
        return next(CustomErrorHandler.unAuthorized());
    }
    // if filename then remove prev image
    if(filename && post.post_image){
      fs.unlinkSync(post.post_image);
      data.post_image = `images/${filename}`;
    }else if(filename){
      data.post_image = `images/${filename}`;
    }

    // update post 
    await CCPost.findByIdAndUpdate(data.post_id, data);

    return res.status(200).json({
      success: true,
      message: "Post Edited Successfully"
    });
   }catch(err){
    return next(err);
   }
}

module.exports = {post, editPost};

