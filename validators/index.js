//--- 2번에서 본 위치에 export 된 요소가 있는지 체크한다. ---

const login = require('./login.validator');
const signup = require('./signup.validator');
//const post = require('./post.validator')

module.exports = {
  login,
  signup,
};
