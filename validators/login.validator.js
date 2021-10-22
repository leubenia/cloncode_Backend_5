const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error(() => {
      return {
        message: '이메일이 잘못되었습니다.',
      };
    }),
  pw: Joi.string()
    .min(4)
    .required()
    .error(() => {
      return {
        message: '패스워드가 잘못되었습니다.',
      };
    }),
});

module.exports = loginSchema;
