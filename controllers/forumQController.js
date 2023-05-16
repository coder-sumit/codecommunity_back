const ForumQ = require("../models/cc_forumQ");
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
         post: resQ
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


module.exports = {postForumQ, editForumQ};