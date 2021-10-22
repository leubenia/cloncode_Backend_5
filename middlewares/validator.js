const Joi = require('joi');
const Validators = require('../validators');

//--- 2. validators 경로 내 index 파일을 불러와 파라미터로 받은 항목이 있는지 체크한다 ---
module.exports = function (validator) {
  //parameter로 받은 값이 validators/index.js 내 존재하지 않으면 throw error
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  //--- 3. 해당하는 파일이 있다면 그 파일 내 구현한 Schema로 체크한다 ---
  return async function (req, res, next) {
    try {
      console.log('검사중이야');
      console.log(req.body);

      const { error, validated } = await Validators[validator].validate(
        req.body
      );
      console.log(error);
      if (error) {
        res.status(401).send({
          result: 'fail',
          errorMessage: error.message,
        });
        return;
      }
      req.body = validated;
      console.log('검사완료');
      next();
    } catch (err) {
      if (err.isJoi)
        res.status(401).send({
          result: 'fail',
          errorMessage: '입력정보를 다시 확인해주세요.',
        });
    }
  };
};
