const { users } = require("../models");
var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//유효성체크 함수
//id 유효성 체크 -  알파벳 대소문자, 숫자만 사용가능, 최소 3자리 이상
const valCheckId = function (target_id) {
  const regex_id =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const idCheckResult = target_id.match(regex_id);

  return idCheckResult == target_id;
};

//pw 유효성 체크 - 패스워드는 닉네임과 같은 내용이 포함될 수 없음, 최소 4자리 이상
const valCheckPw = function (target_password) {
  if (
    target_nickname.indexOf(target_password) == -1 &&
    target_password.length >= 4
  ) {
    return true;
  }
  return false;
};

//회원가입
router.post("/", async (req, res) => {
  try {
    let { userName, email, profile, pw, birthday, gender } = req.body;

    // 프론트와 논의함 => id는 메일로 받기로.
    if (!valCheckId(email)) {
      res.status(400).send({
        errorMessage:
          "아이디는 알파벳 대소문자와 숫자만 사용할 수 있으며, 최소 3자리 이상이어야 합니다.",
      });
      return;
    }

    //패스워드 유효성 체크
    if (!valCheckPw(pw)) {
      res.status(400).send({
        errorMessage:
          "패스워드는 닉네임과 같은 내용이 포함될 수 없으며, 최소 4자리 이상이어야 합니다.",
      });
      return;
    }

    //중복 아이디 여부 체크
    const existUserId = await users.findOne({ where: { userId } });
    if (existUserId) {
      res.status(400).send({
        errorMessage: "이미 가입된 아이디가 있습니다.",
      });
      return;
    }

    console.log({ users });
    const salt = crypto.randomBytes(128).toString("base64");
    userPw = crypto
      .createHash("sha512")
      .update(userPw + salt)
      .digest("hex");

    //salt값 같이 저장해야함. 없으면 로그인 시 비교불가
    await users.create({
      userName: userName,
      email: email,
      profile: profile,
      pw: pw,
      birthday: birthday,
      gender: gender,
      salt: salt,
    });

    res.status(200).send({ msg: "회원가입 완료!" });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      errorMessage: "알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.",
    });
  }
});

router.post("/login", async (req, res) => {
  let { userId, userPw } = req.body;

  //userPw 해시화 후 재할당
  try {
    const users = await users.findOne({ where: { userId } });

    if (users) {
      res.status(400).send({
        result: "fail",
      });
    }

    //계정별 저장되어있는 salt값을 활용해서 해시화
    let salt = users.salt;
    findUserPw = crypto
      .createHash("sha512")
      .update(userPw + salt)
      .digest("hex");

    //해사화된 pw와 회원가입 시 해시화해서 저장한 pw와 비교
    if (findUserPw != users.userPw) {
      res.status(400).send({
        errorMessage: "아이디 또는 패스워드가 잘못됐습니다.",
      });
      return;
    }

    //jwt토큰 생성
    const token = jwt.sign(
      {
        userId: userId,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    console.log("-----------token----------");
    console.log(token);

    //생성한 토큰을 쿠키에 담아서 response
    // res.cookie('token', token, {
    //   httpOnly: true,
    // });

    res.send({
      result: "success",

      token: token,
      message: "로그인 완료",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      code: 400,
      errorMessage: "알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.",
    });
  }
});

module.exports = router;
