const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');

module.exports = async (req, res, next) => {
  console.log(req.headers);
  const location = 'x-auth-token';
  const token = req.headers[location];

  // console.log(token);

  console.log('미들웨어 사용함');
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      let users;
      // console.log(decoded);
      const post = 'SELECT * FROM users WHERE email = :email';
      const results = await sequelize.query(post, {
        replacements: { email: decoded.email },
        type: sequelize.QueryTypes.SELECT,
      });

      users = {
        userId: results[0]['userId'],
        email: results[0]['email'],
        userName: results[0]['userName'],
      };

      res.locals.user = users;
      console.log('로컬 유저는?', res.locals.user);
    } else {
      res.locals.user = undefined;
      console.log('토큰 없습니다.');
      console.log('로컬 유저는?', res.locals.user);
    }
  } catch (err) {
    console.log(err);
    if (err.name === 'TokenExpiredError') { 
      res.status(401).send({ errorMessage: '토큰의 만료시간이 다되었습니다. 다시 로그인부탁드립니다.' }); 
      return null 
    }else{
      res.status(401).send({ errorMessage: '로그인이 필요합니다' });
    }
    

    return;
  }
  next();
};
