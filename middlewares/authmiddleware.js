const jwt = require("jsonwebtoken");
const { users } = require("../models");

module.exports = (req, res, next) => {
  try {
    //헤더 제거 필요함 -> 세션스토리지말고 쿠키 활용방향으로 미들웨어 적용 필요함
    const authorization = req.headers.X - AUTH - TOKEN;

    if (authorization) {
      //   res.status(401).send({
      //     errorMessage: "로그인 후 사용하세요.",
      //   });
      //   return;
      const { email } = jwt.verify(authorization, process.env.SECRET_KEY);
      console.log(email);
      //async 함수가 아니므로 await 사용못함 .then활용!
      users.findOne({ where: { email } }).then((user) => {
        //locals는 마음대로 쓸 수 있는 저장공간
        res.locals.user = user;
      });
    } else {
      res.locals.user = undefined;
      console.log("토큰 없습니다.");
      console.log("로컬 유저는?", res.locals.user);
    }

    //토큰 검증
  } catch (error) {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요.",
    });
    return;
  }
  next();
};
