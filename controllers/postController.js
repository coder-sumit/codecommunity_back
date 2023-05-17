const CCPost = require("../models/cc_post");
const CCComment = require("../models/cc_comment");
const CCCommentReply = require("../models/cc_commentReply");
const Like = require("../models/cc_like");
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

const deletePost = async(req, res, next)=>{
 try{
  const post_id = req.params.id;
  const user_id = req.user._id;

  if(!post_id){
    return next(CustomErrorHandler.invalidInput());
  }
  
  // find the post
  let post = await CCPost.findById(post_id);
  if(!post){
    return next(CustomErrorHandler.invalidInput());
  }

  // check user autherization
  if(user_id != post.user_id){
    return next(CustomErrorHandler.unAuthorized());
  }

  // find comments for that post
  let comments = await CCComment.find({post_id,});

  let commentReplies = await CCCommentReply.find({post_id});

  // delete all likes associated with comment replies
  await Promise.all(
    commentReplies.map(async(comment_reply)=>{
      await Like.deleteMany({like_target_type: "comment_reply", like_target_id: comment_reply._id});
      await CCCommentReply.findByIdAndDelete(comment_reply._id);
    })
  )

  // delete all likes associated with comments and delete all comments too
  await Promise.all(
    comments.map(async(comment)=>{
      await Like.deleteMany({like_target_type: "comment", like_target_id: comment._id});
      await CCComment.findByIdAndDelete(comment._id);
    })
  )

  // delete all likes associated with post
  await Like.deleteMany({like_target_type: "post", like_target_id: post_id});
  // delete post

  // remove image 
  if(post.post_image){
    fs.unlinkSync(post.post_image);
  }
  await CCPost.findByIdAndDelete(post_id);

  return res.status(200).json({
    success: true,
    message: "Post removed!"
  });
 }catch(err){
  return next(err);
 }
}

module.exports = {post, editPost, deletePost};