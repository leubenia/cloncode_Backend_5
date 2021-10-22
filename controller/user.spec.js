const { signup } = require('./user');
const { login } = require('./user');
const { users } = require('../models');
const { failover } = require('../validators/login.validator');
jest.mock('../models/');
//salt 값 지정

//signup 테스트
test.skip('입력이 잘되면 findOne을 호출한다.', async () => {
  const mockedsend = jest.fn();
  users.findOne = jest.fn();
  let req = {
    body: {
      userName: '은규',
      email: 'stravinest@naver.com',
      birthday: '1234',
      gender: '남성',
      pw: '1234',
    },
    file: {
      location: '',
    },
  };

  const res = {
    status: () => ({
      send: () => {},
    }),
  };

  await signup(req, res);
  expect(users.findOne).toHaveBeenCalledTimes(1);
  // await validation(req, res);
  //expect(mockedsend).toBeCalledWith({ result: '회원가입실패' });
});

test.skip('이미 가입된 아이디가 있으면 result: faild이미 가임된 아이디가 있습니다.', async () => {
  const mockedsend = jest.fn();
  users.findOne = jest.fn();
  let req = {
    body: {
      userName: '은규',
      email: 'stravinest@naver.com',
      birthday: '1234',
      gender: '남성',
      pw: '1234',
    },
    file: {
      location: '',
    },
  };

  const res = {
    status: () => ({
      send: mockedsend,
    }),
  };
  await users.findOne.mockReturnValue(true);
  await signup(req, res);
  expect(mockedsend).toBeCalledWith({
    errorMessage: '이미 가입된 아이디가 있습니다.',
    result: 'fail',
  });
  // await validation(req, res);
  //expect(mockedsend).toBeCalledWith({ result: '회원가입실패' });
});

test.skip('가입된 아이디가 없고 이미지가 없으면 users.create를 실행한다.', async () => {
  const mockedsend = jest.fn();
  users.findOne = jest.fn();
  users.create = jest.fn();
  let req = {
    body: {
      userName: '은규',
      email: 'stravinest@naver.com',
      birthday: '1234',
      gender: '남성',
      pw: '1234',
    },
    file: {
      location: '',
    },
  };

  const res = {
    status: () => ({
      send: mockedsend,
    }),
  };
  await users.findOne.mockReturnValue(null);
  await signup(req, res);
  expect(users.create).toHaveBeenCalledTimes(1);

  // await validation(req, res);
  //expect(mockedsend).toBeCalledWith({ result: '회원가입실패' });
});

test.skip('가입된 아이디가 없고 이미지가 있으면 users.create를 실행한다.', async () => {
  const mockedsend = jest.fn();
  users.findOne = jest.fn();
  users.create = jest.fn();
  let req = {
    body: {
      userName: '은규',
      email: 'stravinest@naver.com',
      birthday: '1234',
      gender: '남성',
      pw: '1234',
    },
    file: {
      location: 'image',
    },
  };

  const res = {
    status: () => ({
      send: mockedsend,
    }),
  };
  await users.findOne.mockReturnValue(null);
  await signup(req, res);
  expect(users.create).toHaveBeenCalledTimes(1);

  // await validation(req, res);
  //expect(mockedsend).toBeCalledWith({ result: '회원가입실패' });
});

test.skip('가입된 아이디가 없고 이미지가 있으면 image success', async () => {
  const mockedsend = jest.fn();
  users.findOne = jest.fn();
  users.create = jest.fn();
  let req = {
    body: {
      userName: '은규',
      email: 'stravinest@naver.com',
      birthday: '1234',
      gender: '남성',
      pw: '1234',
    },
    file: {
      location: 'image',
    },
  };

  const res = {
    status: () => ({
      send: mockedsend,
    }),
  };
  await users.findOne.mockReturnValue(null);
  await signup(req, res);
  expect(mockedsend).toBeCalledWith({
    result: 'image success',
  });
});

//login 테스트
test('입력이 잘되면 findOne을 호출한다.', async () => {
  const mockedsend = jest.fn();
  users.findOne = jest.fn();
  let req = {
    body: {
      email: 'stravinest@naver.com',
      pw: '1234',
    },
  };

  const res = {
    status: () => ({
      send: () => {},
      json: () => {},
    }),
  };

  await login(req, res);
  expect(users.findOne).toHaveBeenCalledTimes(1);
});

test('해당 아이디가 없으면 fail 과 에러메세지를 띄운다.', async () => {
  const mockedsend = jest.fn();
  users.findOne = jest.fn();
  let req = {
    body: {
      email: 'stravinest@naver.com',
      pw: '1234',
    },
  };

  const res = {
    status: () => ({
      send: mockedsend,
      json: () => {},
    }),
  };
  await users.findOne.mockReturnValue(null);
  await login(req, res);
  expect(mockedsend).toBeCalledWith({
    errorMessage: '찾으시는 아이디가 없습니다.',
    result: 'fail',
  });
});

test('해당 아이디가 없으면 status(400) 에러', async () => {
  const mockedsend = jest.fn();
  users.findOne = jest.fn();
  let req = {
    body: {
      email: 'stravinest@naver.com',
      pw: '1234',
    },
  };

  const res = {
    status: jest.fn(() => res),
    send: mockedsend,
    json: () => {},
  };
  await users.findOne.mockReturnValue(null);
  await login(req, res);
  expect(res.status).toBeCalledWith(400);
});

test('해당 아이디가 있고 아이디 패스워드 잘 되어있으면 result :success', async () => {
  const mockedsend = jest.fn();
  users.findOne = jest.fn();
  let req = {
    body: {
      email: 'stravinest@naver.com',
      pw: '1234',
    },
  };

  const res = {
    status: jest.fn(() => res),
    send: mockedsend,
    json: () => {},
  };
  await users.findOne.mockReturnValue(
    Promise.resolve({
      salt: 'VLftNY4zk0OQPKx82VTO2qQXkPBlAtqmW5b/AcS7HLz21irxdJf8EX2e2f/ziPY6vmXdn635tvoo5o81YyvPKwXQYEDDNKRALre05HqoQdgPduf3wCCGk0YJjddQn276PrZ820RP7pXPZEFZuQN67HRflH6rVLqmiTLkm2gtmkE=',
      pw: '04cbcd2a1eebed173ec4fe012c4ebe3cdbcbd47fd777b850a0d573957c67a82d2f261e0adba9759b1b35a4e8f2dbb94fea274579db169d84005024559089372d',
    })
  );
  await login(req, res);

  expect(res.status).toBeCalledWith(200);
});

test('해당 아이디가 있고 아이디 패스워드 잘 못 입력하면 status 400', async () => {
  const mockedsend = jest.fn();
  users.findOne = jest.fn();
  let req = {
    body: {
      email: 'stravinest@naver.com',
      pw: '123456',
    },
  };

  const res = {
    status: jest.fn(() => res),
    send: mockedsend,
    json: () => {},
  };
  await users.findOne.mockReturnValue(
    Promise.resolve({
      salt: 'VLftNY4zk0OQPKx82VTO2qQXkPBlAtqmW5b/AcS7HLz21irxdJf8EX2e2f/ziPY6vmXdn635tvoo5o81YyvPKwXQYEDDNKRALre05HqoQdgPduf3wCCGk0YJjddQn276PrZ820RP7pXPZEFZuQN67HRflH6rVLqmiTLkm2gtmkE=',
      pw: '04cbcd2a1eebed173ec4fe012c4ebe3cdbcbd47fd777b850a0d573957c67a82d2f261e0adba9759b1b35a4e8f2dbb94fea274579db169d84005024559089372d',
    })
  );
  await login(req, res);

  expect(res.status).toBeCalledWith(400);
});
