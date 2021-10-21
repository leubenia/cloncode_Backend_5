const { signup } = require('./user');
const { users } = require('../models');
const { failover } = require('../validators/login.validator');
jest.mock('../models/');
//salt 값 지정

test('입력이 잘되면 findOne을 호출한다.', async () => {
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

test('이미 가입된 아이디가 있으면 result: faild이미 가임된 아이디가 있습니다.', async () => {
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

test('가입된 아이디가 없고 이미지가 없으면 users.create를 실행한다.', async () => {
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

test('가입된 아이디가 없고 이미지가 있으면 users.create를 실행한다.', async () => {
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

test('가입된 아이디가 없고 이미지가 있으면 image success', async () => {
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
  // await validation(req, res);
  //expect(mockedsend).toBeCalledWith({ result: '회원가입실패' });
});
