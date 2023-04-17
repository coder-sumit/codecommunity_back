const joi = require('joi');
// Joi schema for sign-up validation
const signUpSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    mobile: joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    repeat_password: joi.ref('password'),
    u_dob: joi.string().pattern(new RegExp('^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$')).required(),
    gender: joi.string().max(1).required(),
    c_kldge: joi.string()
});

 module.exports = signUpSchema;