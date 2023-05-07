const CustomErrorHandler = require("../services/CustomErrorHandler");

const sameAuth = async(req, res, next)=>{
     let paramUser = req.params.id;
     let userId = req.user._id;

     if(userId != paramUser){
        return next(CustomErrorHandler.unAuthorized());
     }
     next();
}

module.exports = sameAuth;