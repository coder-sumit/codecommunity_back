const joi = require("joi");

const loginSchema = joi.object({
   username: joi.string().min(3).max(20).required(),
   password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

module.exports = loginSchema;