const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error(() => {
      return {
        message: '이메일이 잘못되었습니다.',
      };
    }),
  userName: Joi.string()
    .required()
    .error(() => {
      return {
        message: '유저네임이 잘못되었습니다.',
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
  birthday: Joi.string()
    .required()
    .error(() => {
      return {
        message: '생일이 잘못되었습니다.',
      };
    }),
  gender: Joi.string()
    .required()
    .error(() => {
      return {
        message: '성별이 잘못되었습니다.',
      };
    }),
}).unknown();

module.exports = signupSchema;
