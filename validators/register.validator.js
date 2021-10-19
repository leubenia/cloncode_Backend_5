//--- 다양한 조건들을 설정할 수 있다. joi.dev 참고 ---
//--- 3번에서 본 위치의 Schema를 기준으로 체크한다 ---
const Joi = require('joi');

const registerSchema = Joi.object({
  userId: Joi.string().required(),
  userPw: Joi.string().required(),
  nickname: Joi.string().required(),
});

module.exports = registerSchema;
