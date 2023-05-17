const ForumA = require("../models/cc_forumA");
const Like = require("../models/cc_like");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const fs = require("fs");

const postForumA = async(req, res, next)=>{
   try{
     let user = req.user._id;
      let data = JSON.parse(req.body.data);
      let filename = req.file?.filename;

      if(filename){
         data.a_image = `images/${filename}`;
      }
      data.a_user_id = user;
  
      if(!(data.a_caption || data.filename || data.a_code || data.forum_q)){
         fs.unlink(data.a_image);
         return next(CustomErrorHandler.invalidInput());
      }

      let resA = await ForumA.create(data);

      return res.status(200).json({
         success: true,
         message: "answer created successfully",
         forumA: resA
       });
   }catch(err){
      return next(err);
   }
}

const editForumA = async(req, res, next)=>{
  try{
   let data = JSON.parse(req.body.data);
   let filename = req.file?.filename;
   let user = req.user._id;

   // get post 
   let a = await ForumA.findById(data.a_id);
   if(!a){
       return next(CustomErrorHandler.invalidInput());
   }
   if(a.a_user_id != user){
      return next(CustomErrorHandler.unAuthorized());
   }
   // if filename then remove prev image
   if(filename && a.a_image){
      fs.unlinkSync(a.a_image);
      data.a_image = `images/${filename}`;
    }else if(filename){
      data.a_image = `images/${filename}`;
   }

   // update a 
   await ForumA.findByIdAndUpdate(data.a_id, data);

   return res.status(200).json({
      success: true,
      message: "Answer Edited Successfully"
    });

  }catch(err){
    return next(err);
  }
}

const deleteForumA = async(req, res, next)=>{
     try{
      let forum_a_id = req.params.id;
      let user_id = req.user._id;

      // find forum_a
      let forum_a = await ForumA.findById(forum_a_id);

      if(!forum_a){
         return next(CustomErrorHandler.invalidInput());
      }
      if(user_id != forum_a.a_user_id){
         return next(CustomErrorHandler.unAuthorized());
      }

      // delete all likes and image associated with forum_a
      await Like.deleteMany({like_target_type: "forum_a", like_target_id: forum_a._id});
      if(forum_a.a_image){
         fs.unlinkSync(forum_a.a_image);
        }
      await ForumA.findByIdAndDelete(forum_a._id);

      return res.status(200).json({
         success: true,
         message: "forum_a deleted!"
      });

     }catch(err){
      return next(err);
     }
}
module.exports = {postForumA, editForumA, deleteForumA};