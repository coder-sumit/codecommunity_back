const CustomErrorHandler = require("../services/CustomErrorHandler");
const JwtService = require("../services/JwtService");
const auth = (req, res, next)=>{
   let authHeader = req.headers.authorization;
   if(!authHeader){
    return next(CustomErrorHandler.unAuthorized());
   }
   let token = authHeader.split(" ")[1];

   try{
     let {_id, role, status} = JwtService.verify(token);
     req.user = {
        _id,
        role,
        status,
     }
     next();
   }catch(err){
    return next(CustomErrorHandler.unAuthorized());
   }
}

module.exports = auth;