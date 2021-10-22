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

 
  <h3>l.회원가입 파일업로드시에 프론트와 연결이 안되었던 문제</h3>
 front 의 생각: 이미지 파일만 multi part form 으로 넘기고 나머지 data는 body로 넘긴다.
 back 의 생각 : 모두다 multi part form 으로 받는다. 
 <h3>2.model관계설정</h3>
 ORM sequelize를 사용했는데 첫날 model 관계 설정에 에러사항이 있엇다. 
 관계들을 명확히 설정하고 필요한 컬럼들을 초기부터 최대한 완벽하게 설정하는게 좋을 듯 하다.
 <h3>3.swagger폼데어터 형식</h3>
 swagger autogen을 사용해 자동으로 생성하면 폼데이터 형식의 입력 값은 설정되지 않기때문에
 직접 설정을 해줘야 한다. 문법 자체를 swagger hub에서 검색을 하여 찾아서 설정하였다.
 <h3>4.test code 시에 mock을 사용한 return 값 설정하는부분</h3>
 mockReturnValue를 사용하는데 promise.resolve 형태로 어떤 원하는 리턴값을 정해주면 된다.
 <h3>5.joi 에러메세지 커스터마이징</h3>
 조이를 스키마 자체를 분리하여 미들웨어 형식으로 설정하여 사용하였는데
 각각의 스키마의 프로퍼티 들에 대해서 에러 메세지를 달리 출력하고 싶었다.
 이 에러메세지의 커스터 마이징 하는부분을 구현하려 했으나 잘 안되었다. 

 <h3>6.스웨거 사용중.. 로그인여부 헤더의 정보를 보내지 않음..</h3>
 스웨거의 Security옵션을 사용하여 로그인을 하여 토큰값을 넣어서 로그인 상태로 만들었다.
 
 <h3>7.DB의 조인 사용중 코맨트와 게시글을 조인해서 찾으니. 해당 개시글이 코맨트 갯수만큼 중복되어 나오거나, NULL값이 들어가 보기힘듬</h3>
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
<h3>8. 게시물에 댓글과 좋아요를 리스트화 시켜서 프론트에 보낼때 생기는 문제</h3>
게시물(post) response에 게미시물외에 댓글과 좋아요를 리스트화 시켜서 프론트에 보내줄때, commentget과 likesget를 선언해주고 값을 불러와서 게시물에 리스트화시켜서 보내주려고 했는데, 댓글과 좋아요는 포스트에 바로 연결되어 붙어 있는 항목이 아니라서 처음 시도할때는 값을 불러오지를 못했다. 하지만 터미널에서 게시물안에 있는 리스트를 확인을 했더니 dataValues라는 값 밑에 댓글과 좋아요 기능이 리스트화 되서 포함되어 있는 것을 확인을 해서 post.commment값이 아닌 post.dataValues.comment 이런 형식으로 dataValues를 가운데 넣어주어야 기능이 작동을 하였다.  







