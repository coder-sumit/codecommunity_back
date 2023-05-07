const {signUpSchema, loginSchema} = require("../schemas");
const CCUser = require("../models/cc_user");
const CCFollowList = require("../models/cc_followList");
const CCBlockList = require("../models/cc_blockList");
const bcrypt = require("bcrypt");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const JwtService = require("../services/JwtService");
const fs = require("fs");


const registerUser = async (req, res, next)=>{
try{
  let data = req.body;
  const {error} = signUpSchema.validate(data);
  if(error){
    return next(error);
  }

  if(data.password != data.repeat_password){
   return next({message: "password and repeat password are not same"});
  }

  // encript the password
  const hashedPass = await bcrypt.hash(data.password, 10);
  data.password = hashedPass;
  data.code_kldge = data.code_kldge.replaceAll(' ','');

  // check username email and mobile
  let userExist = await CCUser.exists({mobile: data.mobile});
  if(userExist){
    return next(CustomErrorHandler.alreadyExists("mobile already registered"));
  }

  // create user
  let result = await CCUser.create(data);

  // console.log(result);


  // token
  let token = await JwtService.sign({_id: result._id, role: result.user_role, status: result.user_status});

  delete data.password;
  delete data.repeat_password;


  return res.status(200).json({
    success: true,
    message: "registration successful",
    data,
    token,
  });

}catch(err){
  return next(err);
}

}


const loginUser = async (req, res, next)=> {
  try{
    let data = req.body;
    const {error} = loginSchema.validate(data);
    if(error){
      return next(error);
    }

    const user = await CCUser.findOne({username: data.username});

    if(!user){
      return next(CustomErrorHandler.wrongCredentials());
    }

    const match = await bcrypt.compare(data.password, user.password);

    if(!match){
      return next(CustomErrorHandler.wrongCredentials());
    }

    // generate token
    let token = await JwtService.sign({_id: user._id, role: user.user_role, status: user.user_status});


    
    return res.status(200).json({
      success: true,
      message: "login successful",
      token,
    });              
  }catch(err){
     return next(err);
  }
}

const me = async(req, res, next)=>{
  try{
    let user = await CCUser.findOne({_id: req.user._id}).select("-__v -password -updatedAt");
    return res.status(200).json({
      success: true,
      message: "user info",
      data: user
    })
  }catch(err){
    return next(err);
  }
}

const profile = async(req, res, next)=>{
  let username = req.params.id;
  let main_user = req.user._id;
  try{
    let user = await CCUser.findOne({username}).select("-__v -password -updatedAt");
    let fl_user = user._id;
    let bl_user = fl_user;
    let isFollowing = await CCFollowList.findOne({main_user: fl_user, fl_user: main_user});
    let following = true;
    if(!isFollowing){
      following = false;
    }
    let isBlocked = await CCBlockList.findOne({main_user, bl_user,});
    let blocked = true;
    if(!isBlocked){
      blocked = false;
    }
    return res.status(200).json({
      success: true,
      message: "user profile",
      data: { 
        user,
        following,
        blocked,}
    });
  }catch(err){
    return next(err);
  }

}

const toggleFollow = async(req, res, next)=>{
   try{
    let main_user = req.params.user;
    let fl_user = req.user._id;
 
    // check if user is in follow list
    let isFollowing = await CCFollowList.findOne({main_user, fl_user,});
    let following = true;
    if(isFollowing){
       await CCFollowList.findByIdAndRemove(isFollowing._id);
       following = false;
    }else{
       await CCFollowList.create({
         main_user,
         fl_user,
       });
    }

    return res.status(200).json({
      success: true,
      following,
    });
   }catch(err){
    return next(err);
   }
}

const toggleBlock = async(req, res, next)=>{
  try{
   let main_user = req.user._id;
   let bl_user = req.params.user;

   // check if user is in follow list
   let isBlocked = await CCBlockList.findOne({main_user, bl_user,});
   let blocked = true;
   if(isBlocked){
      await CCBlockList.findByIdAndRemove(isBlocked._id);
      blocked = false;
   }else{
      await CCBlockList.create({
        main_user,
        bl_user,
      });
   }

   return res.status(200).json({
     success: true,
     blocked,
   });
  }catch(err){
   return next(err);
  }
}

const blockList = async(req, res, next)=>{
  try{
    let user = req.user._id;
  let blockList = await CCBlockList.find({main_user: user}).populate("bl_user");
  let blockListN = blockList.map((doc)=>{
    return doc.bl_user;
  });
  blockList = blockListN;
  blockList = blockList.map((doc)=>{
    return {
      _id: doc._id,
      name: doc.name,
      username: doc.username,
      profile_pic: doc.profile_pic
    }
  })
  return res.status(200).json({
    success: true,
    data: {blockList,}
  })
  }catch(err){
    return next(err);
  }
}

const followList = async(req, res, next)=>{
  try{
    let user = req.params.id;
  let followList = await CCFollowList.find({main_user: user}).populate("fl_user");

  let followListN = followList.map((doc)=>{
    return doc.fl_user;
  });
  followList = followListN;
  followList = followList.map((doc)=>{
    return {
      _id: doc._id,
      name: doc.name,
      username: doc.username,
      profile_pic: doc.profile_pic
    }
  })
  return res.status(200).json({
    success: true,
    data: {followList,}
  })
  }catch(err){
    return next(err);
  }
}

const updateProfile = async(req, res, next)=>{
  try{
    let data = req.body;
    delete data.password;
    delete data.gender;
    delete data.user_role;
    delete data.user_status;

    let id = req.user._id;
 
    await CCUser.findByIdAndUpdate(id, data);
    return res.status(200).json({
      success: true,
      message: "Updated Successfully"
    })
  }catch(err){
    return next(err);
  }
}

const updateAvatar = async(req, res, next)=>{
try{
  let id = req.params.id;
  let filename = req.file.filename;
  // find user and check for avatar
  let user = await CCUser.findById(id);
  let profile_pic = user.profile_pic;
  // remove old avatar
  if(profile_pic){
    fs.unlinkSync(profile_pic)
  }
  profile_pic = `uploads/${filename}`;

  // save user
  await CCUser.findByIdAndUpdate(id, {profile_pic,});

  return res.status(200).json({
    success: true,
    message: "profile pic saved successfully!"
  });
}catch(err){
  return next(err);
}
}
module.exports = {registerUser, loginUser, me, profile, toggleFollow, toggleBlock, blockList, followList, updateProfile, updateAvatar};