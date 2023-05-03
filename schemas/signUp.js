const joi = require('joi');
// Joi schema for sign-up validation
const signUpSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    username: joi.string().min(3).max(20).required(),
    github_url: joi.string(),
    insta_id: joi.string(),
    gmail: joi.string(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    dob: joi.string().pattern(new RegExp('^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$')).required(),
    mobile: joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    repeat_password: joi.ref('password'),
    code_kldge: joi.string(),
    gender: joi.string().max(1).required()
});

 module.exports = signUpSchema;