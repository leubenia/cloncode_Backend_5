# cloncode_Backend_5
백엔드 클론코딩 5조


<h2>사이트설명</h2>
face book clone coding

<h2>제작기간 팀원소개</h2>
<li> 2021 10월18일 ~ 2021 10월 22일</li>
<li>6인 1조 팀프로젝트<br>
<li> front-end:
 이민국,한우석,이지훈  
 <br>
 
<li> back-end:
 안성규,전은규,김도형
  
<h2>사용기술</h2>
<li>Node.js</li>
<li>Express</li>
<li>MYSQL</li>

<h2>라이브러리</h2>

|제목|설명|
|:------:|:---:|
|cors|교차 리소스 공유|
|dotenv|DB비밀번호, 시크릿키 암호화|
|jsonwebtoken|회원가입 작동 방식|
|sequelize|MySQL ORM|
|mysql|MySQL|
|multer|파일처리|
|multer-s3|s3에 파일저장|
|aws-sdk|자바스크립트용 aws서비스사용|
|crypto|비밀번호 해쉬화|
|swagger-autogen|스웨거 자동생성|
|sharp|이미지 리사이징|
  
<h2>deploy</h2>
<li>AWS EC2
<li>AWS s3
<li>AWS lambda
 <br>
<h2>실행화면링크</h2>


<h2>API설계</h2>
  
[API노션](https://generated-drive-f4f.notion.site/API-3411050860cc46d0b583fffd95fff7c1)
  
[API스웨거](http://stravinest.shop/swagger/)
 
[API스웨거사용법](https://velog.io/@stravinest/swagger-%EC%82%AC%EC%9A%A9%EB%B2%95header-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%9C%A0%EC%A7%80)

<h2>문제 해결</h2>

 <h3>스웨거 사용중.. 로그인여부 헤더의 정보를 보내지 않음..</h3>
 스웨거의 Security옵션을 사용하여 로그인을 하여 토큰값을 넣어서 로그인 상태로 만들었다.
 
 <h3>DB의 조인 사용중 코맨트와 게시글을 조인해서 찾으니. 해당 개시글이 코맨트 갯수만큼 중복되어 나오거나, NULL값이 들어가 보기힘듬</h3>
 코맨트를 가져오는 함수를 하나더 만들어서 해당 게시글을의 ID값을 주고 코맨트의 배열을 만들어서 개시글 정보안에 코맨트 배열을 더넣어서 주었다.
 Ex {
    "postId": 41,
    "userId": 43,
    "content": "테스트합니다!!!~!",
    "userName": "이대한",
    "insertDt": "2021-10-22 03:29:18",
    "image": "",
    "comment": [],
    "commentCnt": 0,
    "likeCnt": 6,
    "like": true
  },




