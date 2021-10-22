const { users } = require('../models');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Validator = require('../middlewares/validator');

const multer = require('multer'); //form data 처리를 할수 있는 라이브러리 multer
const multerS3 = require('multer-s3'); // aws s3에 파일을 처리 할수 있는 라이브러리 multer-s3
const AWS = require('aws-sdk'); //javascript 용 aws 서비스 사용 라이브러리
const path = require('path'); //경로지정
AWS.config.update({
  //보안자격증명 액세스 키 설정해야 s3 bucket 접근이 가능하다.
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2', // 한국
});
const upload = multer({
  //upload라는 변수에 multer 생성
  storage: multerS3({
    //multer의 storage옵션을 multers3로 교체
    s3: new AWS.S3(),
    bucket: 'stravinestbucket', //bucket 이름
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    }, //저장할 파일명 설정 버킷 내부에서 oroginal 폴더 아래에 생성됨
    acl: 'public-read-write', //읽기 쓰기 접근가능
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, //최대 사이즈 5mb
});

//salt 값 지정
const saltAppointed = function (pw, salt) {
  console.log('salt넣습니다.');
  pw = crypto
    .createHash('sha512')
    .update(pw + salt)
    .digest('hex');
  return pw;
};

//회원가입
router.post(
  '/signup',
  upload.single('profile'),
  Validator('signup'),
  async (req, res) => {
    try {
      const { userName, email, birthday, gender } = req.body;
      let { pw } = req.body;
      const salt = crypto.randomBytes(128).toString('base64');

      const existUserId = await users.findOne({ where: { email } });
      if (existUserId) {
        console.log('여기 돌면 멈춰야되는디');
        res.status(400).send({
          result: 'fail',
          errorMessage: '이미 가입된 아이디가 있습니다.',
        });
        return;
      }

      if (req.file) {
        console.log('이미지 값 있음');
        //이미지 값이 있으면!!!
        const originalUrl = req.file.location;
        const resizeUrl = originalUrl.replace(/\/original\//, '/thumb/');
        pw = saltAppointed(pw, salt);

        //salt값 같이 저장해야함. 없으면 로그인 시 비교불가
        await users.create({
          userName: userName,
          email: email,
          profile: resizeUrl, //이미지 url
          pw: pw,
          birthday: birthday,
          gender: gender,
          salt: salt,
        });

        res.status(200).send({
          result: 'success',
        });
      } else {
        console.log('이미지 값 없음');
        //이미지 값이 있으면!!!
        pw = saltAppointed(pw, salt);
        //salt값 같이 저장해야함. 없으면 로그인 시 비교불가
        await users.create({
          userName: userName,
          email: email,
          profile: '',
          pw: pw,
          birthday: birthday,
          gender: gender,
          salt: salt,
        });

        res.status(200).send({
          result: 'success',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        errorMessage:
          '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
      });
    }
  }
);
//로그인
router.post('/login', Validator('login'), async (req, res) => {
  let { email, pw } = req.body;
  try {
    let user = await users.findOne({ where: { email } }); //users로 받으면 안되네??

    if (!user) {
      res.status(400).send({
        result: 'fail',
        errorMessage: '찾으시는 아이디가 없습니다.',
      });
    }
    //계정별 저장되어있는 salt값을 활용해서 해시화
    let salt = user.salt;

    findpw = crypto
      .createHash('sha512')
      .update(pw + salt)
      .digest('hex');

    //해사화된 pw와 회원가입 시 해시화해서 저장한 pw와 비교
    if (findpw != user.pw) {
      res.status(400).send({
        result: 'fail',
        errorMessage: '아이디 또는 패스워드가 잘못됐습니다.',
      });
      return;
    }
    //jwt토큰 생성
    const token = jwt.sign(
      {
        email: email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '2h',
      }
    );

    console.log('-----------token----------');
    console.log(token);
    res.send({
      result: 'success',
      token: token,
      email: user.email,
      userName: user.userName,
      profile: user.profile,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      result: 'fail',
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
});
module.exports = router;
