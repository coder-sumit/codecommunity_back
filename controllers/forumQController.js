const ForumQ = require("../models/cc_forumQ");
const ForumA = require("../models/cc_forumA");
const Like = require("../models/cc_like");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const fs = require("fs");

const postForumQ = async(req, res, next)=>{
   try{
     let user = req.user._id;
      let data = JSON.parse(req.body.data);
      let filename = req.file?.filename;

      if(filename){
         data.q_image = `images/${filename}`;
      }
      data.q_user_id = user;
  
      if(!(data.q_caption || data.filename || data.q_code)){
         fs.unlink(data.q_image);
         return next(CustomErrorHandler.invalidInput());
      }

      let resQ = await ForumQ.create(data);

      return res.status(200).json({
         success: true,
         message: "question created successfully",
         forumQ: resQ
       });
   }catch(err){
      return next(err);
   }
}

const editForumQ = async(req, res, next)=>{
  try{
   let data = JSON.parse(req.body.data);
   let filename = req.file?.filename;
   let user = req.user._id;

   // get post 
   let q = await ForumQ.findById(data.q_id);
   if(!q){
       return next(CustomErrorHandler.invalidInput());
   }
   if(q.q_user_id != user){
      return next(CustomErrorHandler.unAuthorized());
   }
   // if filename then remove prev image
   if(filename && q.q_image){
      fs.unlinkSync(q.q_image);
      data.q_image = `images/${filename}`;
    }else if(filename){
      data.q_image = `images/${filename}`;
   }

   // update q 
   await ForumQ.findByIdAndUpdate(data.q_id, data);

   return res.status(200).json({
      success: true,
      message: "Quesion Edited Successfully"
    });

  }catch(err){
    return next(err);
  }
}

const deleteForumQ = async(req, res, next)=>{
   try{
        let forum_q_id = req.params.id;
        let user_id = req.user._id;
         
        // find forum q
        let forum_q = await ForumQ.findById(forum_q_id);

        if(!forum_q){
            return next(CustomErrorHandler.invalidInput());
        }

        if(forum_q.q_user_id != user_id){
          return next(CustomErrorHandler.unAuthorized());
        }

        // find all forum a for forum q
        
        let forum_as = await ForumA.find({forum_q: forum_q_id});

        // delete all likes and images associated with forum_as
        await Promise.all(
         forum_as.map(async(forum_a)=>{
           await Like.deleteMany({like_target_type: "forum_a", like_target_id: forum_a._id});
           if(forum_a.a_image){
            fs.unlinkSync(forum_a.a_image);
           }
           await ForumA.findByIdAndDelete(forum_a._id);
         })
       )

       // delete all likes and image associated with forum_q
       await Like.deleteMany({like_target_type: "forum_q", like_target_id: forum_q._id});
       if(forum_q.q_image){
         fs.unlinkSync(forum_q.q_image);
        }
       await ForumQ.findByIdAndDelete(forum_q._id);

       return res.status(200).json({
         success: true,
         message: "forum_q deleted!"
       });
   }catch(err){
      return next(err);
   }
}


module.exports = {postForumQ, editForumQ, deleteForumQ};