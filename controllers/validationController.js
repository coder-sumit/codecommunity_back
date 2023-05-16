const CCUser = require("../models/cc_user");
const CustomErrorHandler = require("../services/CustomErrorHandler");

const emailExist = async(req, res, next)=>{
    try{
        let gmail = req.params.id;
        if(!gmail){
          return next(CustomErrorHandler.invalidInput());
        }
        let exists = await CCUser.exists({gmail,});
  
        return res.status(200).json({
          success: true,
          exists: exists?true:false
        });

    }catch(err){
        return next(err);
    }

}

const mobileExist = async(req, res, next)=>{
    try{
        let mobile = req.params.id;
        if(!mobile){
          return next(CustomErrorHandler.invalidInput());
        }
        let exists = await CCUser.exists({mobile,});
  
        return res.status(200).json({
          success: true,
          exists: exists?true:false
        });
    }catch(err){
        return next(err);
    }
}

const usernameExists = async(req, res, next)=>{
    try{
        let username = req.params.id;
        if(!username){
          return next(CustomErrorHandler.invalidInput());
        }
        let exists = await CCUser.exists({username,});
  
        return res.status(200).json({
          success: true,
          exists: exists?true:false
        });
    }catch(err){
        return next(err);
    }

}

module.exports = {emailExist, mobileExist, usernameExists};