const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: '5조 얼굴책 API',
    description: 'Description',
  },
  host: '3.34.255.91', //배포 하려고 하는 host에 맞춰줘야 동작함
  basePath: '/',
  schemes: ['http', 'https'],
  tags: [
    {
      name: 'Login',
      description: '로그인',
    },
    {
      name: 'User',
      description: '회원가입',
    },
    {
      name: 'Post',
      description: '게시판',
    },
    {
      name: 'reply',
      description: '댓글',
    },
    {
      name: 'Like',
      description: '좋아요',
    },
  ],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js'];
// const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
//swaggerAutogen으로 outputfile 파일을 app.js 루트로 api 들을 생성한다.
//이때 명령어는 터미널에서 node swagger.js
