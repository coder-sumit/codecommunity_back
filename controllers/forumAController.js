const ForumA = require("../models/cc_forumA");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const fs = require("fs");

const postForumA = async(req, res, next)=>{
   try{
     let user = req.user._id;
      let data = JSON.parse(req.body.data);
      let filename = req.file?.filename;
      console.log(filename);

      if(filename){
         data.a_image = `images/${filename}`;
      }
      data.a_user_id = user;
  
      if(!(data.a_caption || data.filename || data.a_code)){
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
module.exports = {postForumA, editForumA};