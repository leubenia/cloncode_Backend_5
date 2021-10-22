const express = require('express');
const { signup, login } = require('../controller/user');
const Validator = require('../middlewares/validator');
const router = express.Router();

const multer = require('multer'); //form data 처리를 할수 있는 라이브러리 multer
const multerS3 = require('multer-s3'); // aws s3에 파일을 처리 할수 있는 라이브러리 multer-s3
const AWS = require('aws-sdk'); //javascript 용 aws 서비스 사용 라이브러리
const path = require('path'); //경로지정
const { signup } = require('../controller/user');
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

회원가입;
router.post('/signup', upload.single('profile'), Validator('signup'), signup);
//로그인
router.post('/login', Validator('login'), login);

console.log('되돌리기 전');
module.exports = router;
