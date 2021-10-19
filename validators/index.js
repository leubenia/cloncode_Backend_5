//--- 2번에서 본 위치에 export 된 요소가 있는지 체크한다. ---

const login = require('./login.validator');
const signup = require('./signup.validator');
//const post = require('./post.validator')

module.exports = {
  login,
  signup,
};

//--- validator 기준이 늘어남에 따라 파일이 많아지면 아래와 같이 객체에 추가한다 ---

//const register = require('./register.validator')
//const post = require('./post.validator')

//module.exports = {
//  register, post
//}
