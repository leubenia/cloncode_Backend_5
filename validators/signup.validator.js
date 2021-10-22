const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  userName: Joi.string().required(),
  pw: Joi.string().min(4).required(),
  birthday: Joi.string().required(),
  gender: Joi.string().required(),
}).unknown();

module.exports = signupSchema;
