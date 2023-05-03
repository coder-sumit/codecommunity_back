const {signUpSchema, loginSchema} = require("../schemas");
const CCUser = require("../models/cc_user");
const bcrypt = require("bcrypt");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const JwtService = require("../services/JwtService");


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

module.exports = {registerUser, loginUser};