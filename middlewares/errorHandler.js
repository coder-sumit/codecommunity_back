const {DEBUG_MODE} = require("../config");
const {ValidationError} = require("joi");
const errorHandler = (err, req, res, next)=>{
   let statusCode = 500;
   let data = {
    message: "Internal server error",
    ...(DEBUG_MODE === 'true' && {orignalError: err.message})
   } 

   if(err instanceof ValidationError){
    statusCode = 422;
    data = {
        message: err.message
    }
   }
   data.success = false;
   return res.status(statusCode).json(data);
}

module.exports = errorHandler;