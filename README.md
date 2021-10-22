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
<h3>8. 게시물에 댓글과 좋아요를 리스트화 시켜서 프론트에 보낼때 생기는 문제</h3>
게시물(post) response에 게미시물외에 댓글과 좋아요를 리스트화 시켜서 프론트에 보내줄때, commentget과 likesget를 선언해주고 값을 불러와서 게시물에 리스트화시켜서 보내주려고 했는데, 댓글과 좋아요는 포스트에 바로 연결되어 붙어 있는 항목이 아니라서 처음 시도할때는 값을 불러오지를 못했다. 하지만 터미널에서 게시물안에 있는 리스트를 확인을 했더니 dataValues라는 값 밑에 댓글과 좋아요 기능이 리스트화 되서 포함되어 있는 것을 확인을 해서 post.commment값이 아닌 post.dataValues.comment 이런 형식으로 dataValues를 가운데 넣어주어야 기능이 작동을 하였다.  







