const bcrypt = require('bcrypt');
const CCUser = require('../models/cc_user');
const signUpSchema = require("../schemas/signUp");



  const signUp =    async (req, res, next) =>{
  try {
    // Validate request body against Joi schema
    const { error, value } = await signUpSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(value.password, 10);

    // Create new user object with hashed password
    const user = new CCUser({
      name: value.name,
      mobile: value.mobile,
      gender: value.gender,
      password: hashedPassword,
      dob: value.dob,
      username: value.username,
      c_kldge: value.c_kldge
    });

    // Save new user object to database
    const savedUser = await user.save();

    res.json({
      success: true,
      message: 'User created successfully',
      user: savedUser
    });
  } catch (error) {
    next(error);
  }
}

module.exports = signUp;

