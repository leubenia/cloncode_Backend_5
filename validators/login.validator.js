const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  pw: Joi.string().min(4).required(),
});

module.exports = loginSchema;
